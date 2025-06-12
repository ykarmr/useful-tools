"use client";

import { useState, useEffect } from "react";
import { Plus, Check, Trash2, Edit3, X, Calendar, Flag, ListTodo } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolInput from "@/components/layout/tool-input";
import ToolControls from "@/components/layout/tool-controls";
import ToolFaq from "@/components/layout/tool-faq";
import { interpolate, Locale, Translations } from "@/locales";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
}

const PRIORITY_COLORS = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
};

interface TodoClientProps {
  locale: Locale;
  t: Translations;
}

export default function TodoClient({ locale, t }: TodoClientProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">(
    "medium"
  );
  const [newDueDate, setNewDueDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(`todos-${locale}`);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, [locale]);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(`todos-${locale}`, JSON.stringify(todos));
  }, [todos, locale]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        priority: newPriority,
        dueDate: newDueDate || undefined,
        createdAt: new Date().toISOString(),
      };
      setTodos([todo, ...todos]);
      setNewTodo("");
      setNewDueDate("");
      setNewPriority("medium");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editText.trim() } : todo
        )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.filter((todo) => !todo.completed).length;

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.todo.title}
      description={t.todo.description}
      icon={ListTodo}
    >
      {/* 新しいタスクの追加 */}
      <ToolSection title={t.todo.addNewTask}>
        <div className="space-y-6">
          <ToolInput>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
              placeholder={t.todo.whatNeedsToBeDone}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-lg transition-all duration-200"
            />
          </ToolInput>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.todo.priority}
              </label>
              <select
                value={newPriority}
                onChange={(e) =>
                  setNewPriority(e.target.value as "low" | "medium" | "high")
                }
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
              >
                <option value="low">{t.todo.low}</option>
                <option value="medium">{t.todo.medium}</option>
                <option value="high">{t.todo.high}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.todo.dueDate}
              </label>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>

          <ToolControls>
            <button
              onClick={addTodo}
              disabled={!newTodo.trim()}
              className="button-primary px-6 py-3 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Plus size={20} />
              <span>{t.todo.addTask}</span>
            </button>
          </ToolControls>
        </div>
      </ToolSection>

      {/* フィルターと統計 */}
      <ToolSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* フィルター */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.todo.filter}
            </h3>
            <ToolControls layout="horizontal" align="left">
              {(["all", "active", "completed"] as const).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === filterType
                      ? "bg-primary-100 text-primary-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {t.todo[filterType]}
                </button>
              ))}
            </ToolControls>
            <div className="text-sm text-gray-600 mt-3 px-1">
              {interpolate(t.todo.activeCount, {
                count: activeCount.toString(),
                completed: completedCount.toString(),
              })}
            </div>
          </div>

          {/* 統計 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t.todo.statistics}
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t.todo.totalTasks}</span>
                <span className="font-semibold text-gray-900 text-lg">
                  {todos.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t.todo.active}</span>
                <span className="font-semibold text-blue-600 text-lg">
                  {activeCount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t.todo.completed}</span>
                <span className="font-semibold text-green-600 text-lg">
                  {completedCount}
                </span>
              </div>
              {todos.length > 0 && (
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{t.todo.progress}</span>
                    <span className="font-semibold text-gray-900 text-lg">
                      {Math.round((completedCount / todos.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${(completedCount / todos.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ToolSection>

      {/* タスク一覧 */}
      <ToolSection title={t.todo.taskList}>
        {filteredTodos.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-xl mb-2">
              {filter === "completed"
                ? t.todo.noCompletedTasks
                : filter === "active"
                ? t.todo.noActiveTasks
                : t.todo.noTasks}
            </p>
            <p className="text-gray-400 text-base">
              {filter === "all" && t.todo.addTaskToGetStarted}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`p-5 border rounded-xl transition-all duration-200 hover:shadow-md ${
                  todo.completed
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white border-gray-300 hover:border-primary-300 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* チェックボックス */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      todo.completed
                        ? "bg-green-500 border-green-500 text-white shadow-sm"
                        : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                    }`}
                    aria-label={
                      todo.completed
                        ? t.todo.markAsIncomplete
                        : t.todo.markAsComplete
                    }
                  >
                    {todo.completed && <Check size={16} />}
                  </button>

                  {/* コンテンツ */}
                  <div className="flex-1 min-w-0">
                    {editingId === todo.id ? (
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-base"
                          autoFocus
                        />
                        <button
                          onClick={saveEdit}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                          aria-label={t.todo.saveEdit}
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label={t.todo.cancelEdit}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`text-lg leading-relaxed ${
                              todo.completed
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {todo.text}
                          </span>

                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full border flex items-center gap-1 ${
                              PRIORITY_COLORS[todo.priority]
                            }`}
                          >
                            <Flag size={12} />
                            {t.todo[todo.priority]}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            {todo.dueDate && (
                              <div
                                className={`flex items-center space-x-2 ${
                                  isOverdue(todo.dueDate) && !todo.completed
                                    ? "text-red-600 font-medium"
                                    : ""
                                }`}
                              >
                                <Calendar size={16} />
                                <span>
                                  {new Date(todo.dueDate).toLocaleDateString()}
                                  {isOverdue(todo.dueDate) &&
                                    !todo.completed &&
                                    ` ${t.todo.overdue}`}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => startEditing(todo)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              aria-label={t.todo.editTask}
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => deleteTodo(todo.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                              aria-label={t.todo.deleteTask}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.todo.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}

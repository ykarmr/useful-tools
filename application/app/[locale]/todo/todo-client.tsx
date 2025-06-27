"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Check,
  Trash2,
  Edit3,
  X,
  Calendar,
  Flag,
  ListTodo,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolInput from "@/components/layout/tool-input";
import ToolControls from "@/components/layout/tool-controls";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
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

  // Custom styles for date input and select
  const customInputStyles = `
    input[type="date"]::-webkit-calendar-picker-indicator {
      opacity: 0;
      position: absolute;
      right: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    select {
      background-image: none;
    }
    select::-ms-expand {
      display: none;
    }
  `;

  // Add custom styles to head
  if (typeof document !== "undefined") {
    const styleElement = document.getElementById("todo-custom-styles");
    if (!styleElement) {
      const style = document.createElement("style");
      style.id = "todo-custom-styles";
      style.textContent = customInputStyles;
      document.head.appendChild(style);
    }
  }

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
      subtitle={t.todo.subtitle}
      description={t.todo.description}
      icon={ListTodo}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.todo.howToUse.title}
          steps={t.todo.howToUse.steps}
          features={{
            title: t.todo.features.title,
            items: t.todo.features.items,
          }}
        />
      </ToolSection>
      {/* 新しいタスクの追加 */}
      <ToolSection title={t.todo.addNewTask}>
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-8 space-y-8">
          <ToolInput>
            <div className="relative">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                placeholder={t.todo.whatNeedsToBeDone}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg transition-all duration-300 placeholder-gray-400 bg-white shadow-sm hover:shadow-md"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                <Plus size={20} />
              </div>
            </div>
          </ToolInput>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t.todo.priority}
              </label>
              <div className="relative">
                <select
                  value={newPriority}
                  onChange={(e) =>
                    setNewPriority(e.target.value as "low" | "medium" | "high")
                  }
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-base bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer"
                >
                  <option value="low">🟢 {t.todo.low}</option>
                  <option value="medium">🟡 {t.todo.medium}</option>
                  <option value="high">🔴 {t.todo.high}</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t.todo.dueDate}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-base bg-white shadow-sm hover:shadow-md cursor-pointer"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Calendar size={16} />
                </div>
              </div>
            </div>
          </div>

          <ToolControls>
            <button
              onClick={addTodo}
              disabled={!newTodo.trim()}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {t.todo.filter}
              </h3>
            </div>
            <ToolControls layout="horizontal" align="left">
              {(["all", "active", "completed"] as const).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    filter === filterType
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 bg-gray-50"
                  }`}
                >
                  {t.todo[filterType]}
                </button>
              ))}
            </ToolControls>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
              <div className="text-sm text-gray-700 font-medium">
                {interpolate(t.todo.activeCount, {
                  count: activeCount.toString(),
                  completed: completedCount.toString(),
                })}
              </div>
            </div>
          </div>

          {/* 統計 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {t.todo.statistics}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600 font-medium">
                  {t.todo.totalTasks}
                </span>
                <span className="font-bold text-gray-900 text-xl">
                  {todos.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                <span className="text-gray-600 font-medium">
                  {t.todo.active}
                </span>
                <span className="font-bold text-blue-600 text-xl">
                  {activeCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                <span className="text-gray-600 font-medium">
                  {t.todo.completed}
                </span>
                <span className="font-bold text-green-600 text-xl">
                  {completedCount}
                </span>
              </div>
              {todos.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600 font-medium">
                      {t.todo.progress}
                    </span>
                    <span className="font-bold text-gray-900 text-xl">
                      {Math.round((completedCount / todos.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-4 rounded-full transition-all duration-700 ease-out shadow-sm"
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
          <div className="text-center py-20 px-4">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Check className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-500 mb-3">
              {filter === "completed"
                ? t.todo.noCompletedTasks
                : filter === "active"
                ? t.todo.noActiveTasks
                : t.todo.noTasks}
            </h3>
            {filter === "all" && (
              <p className="text-gray-400 text-lg">
                {t.todo.addTaskToGetStarted}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                className={`p-6 border-2 rounded-2xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                  todo.completed
                    ? "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
                    : "bg-white border-gray-200 hover:border-blue-300 shadow-md"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-start space-x-4">
                  {/* チェックボックス */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                      todo.completed
                        ? "bg-gradient-to-br from-green-500 to-green-600 border-green-500 text-white shadow-lg"
                        : "border-gray-300 hover:border-green-400 hover:bg-green-50"
                    }`}
                    aria-label={
                      todo.completed
                        ? t.todo.markAsIncomplete
                        : t.todo.markAsComplete
                    }
                  >
                    {todo.completed && <Check size={18} />}
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
                          className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-base bg-white shadow-sm"
                          autoFocus
                        />
                        <button
                          onClick={saveEdit}
                          className="p-3 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-colors shadow-sm"
                          aria-label={t.todo.saveEdit}
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors shadow-sm"
                          aria-label={t.todo.cancelEdit}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`text-lg leading-relaxed font-medium ${
                              todo.completed
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {todo.text}
                          </span>

                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-1 ${
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
                                    ? "text-red-600 font-medium bg-red-50 px-3 py-1 rounded-lg"
                                    : "text-gray-500"
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
                              className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 transform hover:scale-105"
                              aria-label={t.todo.editTask}
                            >
                              <Edit3 size={18} />
                            </button>
                            <button
                              onClick={() => deleteTodo(todo.id)}
                              className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-105"
                              aria-label={t.todo.deleteTask}
                            >
                              <Trash2 size={18} />
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

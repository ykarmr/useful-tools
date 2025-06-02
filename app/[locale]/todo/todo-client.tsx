"use client";

import { useState, useEffect } from "react";
import { Plus, Check, Trash2, Edit3, X, Calendar, Flag } from "lucide-react";
import AdBanner from "@/components/layout/ad-banner";
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
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {t.todo.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.todo.description}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Todo Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add Todo */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t.todo.addNewTask}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                placeholder={t.todo.whatNeedsToBeDone}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-lg"
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.todo.priority}
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) =>
                      setNewPriority(
                        e.target.value as "low" | "medium" | "high"
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="low">{t.todo.low}</option>
                    <option value="medium">{t.todo.medium}</option>
                    <option value="high">{t.todo.high}</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.todo.dueDate}
                  </label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                onClick={addTodo}
                disabled={!newTodo.trim()}
                className="button-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={20} />
                <span>{t.todo.addTask}</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="card">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex space-x-1">
                {(["all", "active", "completed"] as const).map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === filterType
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {t.todo[filterType]}
                  </button>
                ))}
              </div>

              <div className="text-sm text-gray-600">
                {interpolate(t.todo.activeCount, {
                  count: activeCount.toString(),
                  completed: completedCount.toString(),
                })}
              </div>
            </div>
          </div>

          {/* Todo List */}
          <div className="card">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  {filter === "completed"
                    ? t.todo.noCompletedTasks
                    : filter === "active"
                    ? t.todo.noActiveTasks
                    : t.todo.noTasks}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {filter === "all" && t.todo.addTaskToGetStarted}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`p-4 border rounded-lg transition-all duration-200 ${
                      todo.completed
                        ? "bg-gray-50 border-gray-200"
                        : "bg-white border-gray-300 hover:border-primary-300"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          todo.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 hover:border-green-400"
                        }`}
                        aria-label={
                          todo.completed
                            ? t.todo.markAsIncomplete
                            : t.todo.markAsComplete
                        }
                      >
                        {todo.completed && <Check size={14} />}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {editingId === todo.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" && saveEdit()
                              }
                              className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                              autoFocus
                            />
                            <button
                              onClick={saveEdit}
                              className="p-1 text-green-600 hover:text-green-700"
                              aria-label={t.todo.saveEdit}
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              aria-label={t.todo.cancelEdit}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`text-lg ${
                                  todo.completed
                                    ? "line-through text-gray-500"
                                    : "text-gray-900"
                                }`}
                              >
                                {todo.text}
                              </span>

                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full border ${
                                  PRIORITY_COLORS[todo.priority]
                                }`}
                              >
                                <Flag size={10} className="inline mr-1" />
                                {t.todo[todo.priority]}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                {todo.dueDate && (
                                  <div
                                    className={`flex items-center space-x-1 ${
                                      isOverdue(todo.dueDate) && !todo.completed
                                        ? "text-red-600"
                                        : ""
                                    }`}
                                  >
                                    <Calendar size={14} />
                                    <span>
                                      {new Date(
                                        todo.dueDate
                                      ).toLocaleDateString()}
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
                                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                  aria-label={t.todo.editTask}
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button
                                  onClick={() => deleteTodo(todo.id)}
                                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
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
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t.todo.statistics}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t.todo.totalTasks}</span>
                <span className="font-semibold text-gray-900">
                  {todos.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t.todo.active}</span>
                <span className="font-semibold text-blue-600">
                  {activeCount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t.todo.completed}</span>
                <span className="font-semibold text-green-600">
                  {completedCount}
                </span>
              </div>
              {todos.length > 0 && (
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.todo.progress}</span>
                    <span className="font-semibold text-gray-900">
                      {Math.round((completedCount / todos.length) * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(completedCount / todos.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ad */}
          <AdBanner position="sidebar" t={t} />
        </div>
      </div>

      {/* Inline Ad */}
      <div className="mt-12">
        <AdBanner position="inline" t={t} />
      </div>
    </div>
  );
}

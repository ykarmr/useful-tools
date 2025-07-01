"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Minus,
  RotateCcw,
  Trophy,
  Edit3,
  Trash2,
  Users,
  Check,
  X,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";

interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
}

const TEAM_COLORS = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#8B5CF6", // Purple
  "#F97316", // Orange
  "#06B6D4", // Cyan
  "#84CC16", // Lime
];

interface ScoreboardClientProps {
  locale: Locale;
  t: Translations;
}

export default function ScoreboardClient({ locale, t }: ScoreboardClientProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const savedTeams = localStorage.getItem(`scoreboard-teams-${locale}`);
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    } else {
      // デフォルトチームをi18nから取得
      const defaultTeams = [
        {
          id: "1",
          name: t.scoreboard?.defaultTeamA || "Team A",
          score: 0,
          color: TEAM_COLORS[0],
        },
        {
          id: "2",
          name: t.scoreboard?.defaultTeamB || "Team B",
          score: 0,
          color: TEAM_COLORS[1],
        },
      ];
      setTeams(defaultTeams);
    }
  }, [locale, t]);

  useEffect(() => {
    localStorage.setItem(`scoreboard-teams-${locale}`, JSON.stringify(teams));
  }, [teams, locale]);

  const addTeam = () => {
    const trimmedName = newTeamName.trim();
    if (!trimmedName || teams.length >= 8) return;

    const newTeam: Team = {
      id: Date.now().toString(),
      name: trimmedName,
      score: 0,
      color: TEAM_COLORS[teams.length % TEAM_COLORS.length],
    };
    setTeams([...teams, newTeam]);
    setNewTeamName("");
  };

  const removeTeam = (id: string) => {
    setTeams(teams.filter((team) => team.id !== id));
  };

  const updateScore = (id: string, change: number) => {
    setTeams(
      teams.map((team) =>
        team.id === id
          ? { ...team, score: Math.max(0, team.score + change) }
          : team
      )
    );
  };

  const resetAllScores = () => {
    setTeams(teams.map((team) => ({ ...team, score: 0 })));
  };

  const startEditing = (team: Team) => {
    setEditingTeam(team.id);
    setEditName(team.name);
  };

  const saveEdit = () => {
    if (editName.trim()) {
      setTeams(
        teams.map((team) =>
          team.id === editingTeam ? { ...team, name: editName.trim() } : team
        )
      );
    }
    setEditingTeam(null);
    setEditName("");
  };

  const cancelEdit = () => {
    setEditingTeam(null);
    setEditName("");
  };

  const getWinningTeams = () => {
    if (teams.length === 0) return [];
    const maxScore = Math.max(...teams.map((team) => team.score));
    return teams.filter((team) => team.score === maxScore && team.score > 0);
  };

  const winningTeams = getWinningTeams();

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.scoreboard.title}
      subtitle={t.scoreboard.subtitle}
      description={t.scoreboard.description}
      icon={Trophy}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.scoreboard.howToUse.title}
          steps={t.scoreboard.howToUse.steps}
          features={{
            title: t.scoreboard.howToUse.features.title,
            items: t.scoreboard.howToUse.features.items,
          }}
        />
      </ToolSection>

      {/* Winner Display */}
      {winningTeams.length > 0 && (
        <ToolSection>
          <ToolDisplay background="gradient" size="medium">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {winningTeams.length === 1
                    ? t.scoreboard.winner
                    : t.scoreboard.tied}
                </h3>
                <div className="mt-2 space-y-1">
                  {winningTeams.map((team, index) => (
                    <div
                      key={team.id}
                      className="flex items-center justify-center space-x-2"
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: team.color }}
                      />
                      <span className="text-lg font-semibold text-gray-800">
                        {team.name}
                      </span>
                    </div>
                  ))}
                  <p className="text-xl font-bold text-yellow-600 mt-2">
                    {winningTeams[0].score}{" "}
                    {winningTeams[0].score === 1 ? "point" : "points"}
                  </p>
                </div>
              </div>
            </div>
          </ToolDisplay>
        </ToolSection>
      )}

      {/* Teams Grid */}
      <ToolSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2"
              style={{ borderColor: team.color }}
            >
              {/* Team Header */}
              <div
                className="h-3 w-full"
                style={{ backgroundColor: team.color }}
              />

              <div className="p-4 md:p-6 space-y-4">
                {/* Team Name */}
                <div className="min-h-[2.5rem] flex items-center">
                  {editingTeam === team.id ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        autoFocus
                        maxLength={20}
                      />
                      <button
                        onClick={saveEdit}
                        className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label="Save edit"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                        aria-label="Cancel edit"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <h3
                        className="text-lg font-bold truncate cursor-pointer hover:text-blue-600 transition-colors"
                        style={{ color: team.color }}
                        onClick={() => startEditing(team)}
                        title={team.name}
                      >
                        {team.name}
                      </h3>
                      <button
                        onClick={() => startEditing(team)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        aria-label={`Edit ${team.name}`}
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Score Display */}
                <div className="text-center">
                  <div
                    className="text-4xl md:text-5xl font-bold mb-4 tabular-nums"
                    style={{ color: team.color }}
                  >
                    {team.score}
                  </div>

                  {/* Score Controls */}
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => updateScore(team.id, -1)}
                      disabled={team.score === 0}
                      className="w-12 h-12 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                      aria-label={`Decrease ${team.name} score`}
                    >
                      <Minus size={20} />
                    </button>
                    <button
                      onClick={() => updateScore(team.id, 1)}
                      className="w-12 h-12 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                      aria-label={`Increase ${team.name} score`}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {/* Remove Team */}
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => removeTeam(team.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:opacity-100"
                    aria-label={`Remove ${team.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ToolSection>

      {/* Add Team */}
      <ToolSection title={t.scoreboard.addTeam} icon={Users}>
        <ToolInput label={t.scoreboard.teamName}>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTeam()}
              placeholder={t.scoreboard.teamName}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              maxLength={20}
              disabled={teams.length >= 8}
            />
            <button
              onClick={addTeam}
              disabled={!newTeamName.trim() || teams.length >= 8}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium shadow-md hover:shadow-lg"
            >
              {t.scoreboard.addTeam}
            </button>
          </div>
          {teams.length >= 8 && (
            <p className="text-sm text-amber-600 mt-2 flex items-center gap-1">
              <span>⚠️</span>
              {t.scoreboard.maxTeamsReached}
            </p>
          )}
        </ToolInput>
      </ToolSection>

      {/* Reset Button */}
      <ToolSection>
        <ToolControls>
          <button
            onClick={resetAllScores}
            disabled={teams.every((team) => team.score === 0)}
            className="button-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <RotateCcw size={20} />
            <span>{t.scoreboard.resetScores}</span>
          </button>
        </ToolControls>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.scoreboard.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}

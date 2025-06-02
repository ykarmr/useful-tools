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
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
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
      description={t.scoreboard.description}
      icon={Trophy}
    >
      {/* Winner Display */}
      {winningTeams.length > 0 && (
        <ToolSection>
          <ToolDisplay background="gradient" size="medium">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
              <h3 className="text-xl font-bold text-yellow-800">
                {winningTeams.length === 1
                  ? t.scoreboard.winner
                  : t.scoreboard.tied}
              </h3>
            </div>
            <div className="text-center">
              {winningTeams.map((team, index) => (
                <span
                  key={team.id}
                  className="text-lg font-semibold text-yellow-700"
                >
                  {team.name}
                  {index < winningTeams.length - 1 && ", "}
                </span>
              ))}
              <span className="text-lg text-yellow-600 ml-2">
                ({winningTeams[0].score} points)
              </span>
            </div>
          </ToolDisplay>
        </ToolSection>
      )}

      {/* Teams Grid */}
      <ToolSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white border-2 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200 group"
              style={{ borderColor: team.color }}
            >
              {/* Team Name */}
              <div className="mb-4">
                {editingTeam === team.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="p-1 text-green-600 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 rounded"
                      aria-label="Save edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 rounded"
                      aria-label="Cancel edit"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: team.color }}
                    >
                      {team.name}
                    </h3>
                    <button
                      onClick={() => startEditing(team)}
                      className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 rounded"
                      aria-label={`Edit ${team.name}`}
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Score Display */}
              <div
                className="text-6xl font-bold mb-6"
                style={{ color: team.color }}
              >
                {team.score}
              </div>

              {/* Score Controls */}
              <div className="flex justify-center gap-3 mb-4">
                <button
                  onClick={() => updateScore(team.id, -1)}
                  className="w-12 h-12 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label={`Decrease ${team.name} score`}
                >
                  <Minus size={20} />
                </button>
                <button
                  onClick={() => updateScore(team.id, 1)}
                  className="w-12 h-12 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label={`Increase ${team.name} score`}
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Remove Team */}
              <button
                onClick={() => removeTeam(team.id)}
                className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
                aria-label={`Remove ${team.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </ToolSection>

      {/* Add Team */}
      <ToolSection title={t.scoreboard.addTeam} icon={Users}>
        <ToolInput label={t.scoreboard.teamName}>
          <div className="flex gap-4">
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTeam()}
              placeholder={t.scoreboard.teamName}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              maxLength={20}
            />
            <button
              onClick={addTeam}
              disabled={!newTeamName.trim() || teams.length >= 8}
              className="button-primary disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {t.scoreboard.addTeam}
            </button>
          </div>
        </ToolInput>
      </ToolSection>

      {/* Reset Button */}
      <ToolSection>
        <ToolControls>
          <button
            onClick={resetAllScores}
            className="button-secondary flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <RotateCcw size={20} />
            <span>{t.scoreboard.resetScores}</span>
          </button>
        </ToolControls>
      </ToolSection>
    </ToolLayout>
  );
}

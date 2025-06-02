"use client";

import { useState, useEffect } from "react";
import { Trash2, Users, Shuffle, Plus } from "lucide-react";
import { interpolate, Locale, Translations } from "@/locales";

import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";

interface Player {
  id: string;
  name: string;
}

interface Team {
  id: string;
  name: string;
  players: Player[];
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
  "#EC4899", // Pink
  "#6366F1", // Indigo
];

interface TeamGeneratorClientProps {
  locale: Locale;
  t: Translations;
}

export default function TeamGeneratorClient({
  locale,
  t,
}: TeamGeneratorClientProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [teamSize, setTeamSize] = useState(2);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const savedPlayers = localStorage.getItem(
      `team-generator-players-${locale}`
    );
    if (savedPlayers) {
      try {
        setPlayers(JSON.parse(savedPlayers));
      } catch (error) {
        console.error("Failed to load saved players:", error);
        setPlayers([]);
      }
    }
  }, [locale]);

  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem(
        `team-generator-players-${locale}`,
        JSON.stringify(players)
      );
    }
  }, [players, locale]);

  const addPlayer = () => {
    const trimmedName = newPlayerName.trim();
    if (!trimmedName) return;

    // Check for duplicate names
    if (
      players.some(
        (player) => player.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      alert(
        t.teamGenerator?.duplicatePlayerError ||
          "A player with this name already exists"
      );
      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: trimmedName,
    };
    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter((player) => player.id !== id));
    // Reset teams if a player is removed
    if (teams.length > 0) {
      setTeams([]);
    }
  };

  const generateTeams = () => {
    if (players.length < teamSize) return;

    setIsGenerating(true);

    // Add a small delay for better UX
    setTimeout(() => {
      try {
        // Shuffle players using Fisher-Yates algorithm
        const shuffledPlayers = [...players];
        for (let i = shuffledPlayers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledPlayers[i], shuffledPlayers[j]] = [
            shuffledPlayers[j],
            shuffledPlayers[i],
          ];
        }

        const numberOfCompleteTeams = Math.floor(
          shuffledPlayers.length / teamSize
        );
        const newTeams: Team[] = [];

        // Create complete teams
        for (let i = 0; i < numberOfCompleteTeams; i++) {
          const teamPlayers = shuffledPlayers.slice(
            i * teamSize,
            (i + 1) * teamSize
          );
          const team: Team = {
            id: (i + 1).toString(),
            name: `${t.teamGenerator?.defaultTeamName || "Team"} ${i + 1}`,
            players: teamPlayers,
            color: TEAM_COLORS[i % TEAM_COLORS.length],
          };
          newTeams.push(team);
        }

        // Handle remaining players
        const remainingPlayers = shuffledPlayers.slice(
          numberOfCompleteTeams * teamSize
        );
        if (remainingPlayers.length > 0 && newTeams.length > 0) {
          // Distribute remaining players evenly across teams
          remainingPlayers.forEach((player, index) => {
            const teamIndex = index % newTeams.length;
            newTeams[teamIndex].players.push(player);
          });
        } else if (remainingPlayers.length > 0 && newTeams.length === 0) {
          // If there are remaining players but no complete teams, create one team with all players
          const team: Team = {
            id: "1",
            name: `${t.teamGenerator?.defaultTeamName || "Team"} 1`,
            players: remainingPlayers,
            color: TEAM_COLORS[0],
          };
          newTeams.push(team);
        }

        setTeams(newTeams);
      } catch (error) {
        console.error("Failed to generate teams:", error);
        alert(t.teamGenerator?.failedToGenerate || "Failed to generate teams");
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  };

  const resetTeams = () => {
    setTeams([]);
  };

  const clearAllPlayers = () => {
    if (
      confirm(
        t.teamGenerator?.confirmClearAll ||
          "Are you sure you want to remove all players?"
      )
    ) {
      setPlayers([]);
      setTeams([]);
    }
  };

  const canGenerateTeams = players.length >= teamSize && !isGenerating;
  const remainingPlayers = players.length % teamSize;

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.teamGenerator.title}
      description={t.teamGenerator.description}
      icon={Users}
    >
      {/* Add Players Section */}
      <ToolSection title={t.teamGenerator.addPlayer} icon={Plus}>
        <ToolInput label={t.teamGenerator.playerName}>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addPlayer()}
              placeholder={t.teamGenerator.playerName}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              maxLength={30}
            />
            <button
              onClick={addPlayer}
              disabled={!newPlayerName.trim()}
              className="button-primary disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {t.common.add}
            </button>
          </div>
        </ToolInput>

        {/* Team Size Setting */}
        <ToolInput label={t.teamGenerator.teamSize}>
          <select
            value={teamSize}
            onChange={(e) => {
              setTeamSize(Number.parseInt(e.target.value));
              setTeams([]); // Reset teams when team size changes
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            {[2, 3, 4, 5, 6, 7, 8].map((size) => (
              <option key={size} value={size}>
                {size} {t.teamGenerator.players}
              </option>
            ))}
          </select>
        </ToolInput>

        {/* Team Generation Info */}
        {players.length > 0 && (
          <ToolDisplay background="light" size="small">
            <div className="text-sm text-blue-800">
              <div className="font-medium mb-1">
                {t.teamGenerator?.teamGenerationInfo || "Team Generation Info:"}
              </div>
              <div>
                {interpolate(
                  t.teamGenerator?.teamsOfPlayers ||
                    "{teams} teams of {size} players each",
                  {
                    teams: Math.floor(players.length / teamSize).toString(),
                    size: teamSize.toString(),
                  }
                )}
              </div>
              {remainingPlayers > 0 && (
                <div className="text-blue-600">
                  {interpolate(
                    t.teamGenerator?.remainingPlayersDistributed ||
                      "{remaining} remaining players will be distributed to existing teams",
                    {
                      remaining: remainingPlayers.toString(),
                    }
                  )}
                </div>
              )}
            </div>
          </ToolDisplay>
        )}

        {/* Generate Teams Button */}
        <ToolControls>
          <button
            onClick={generateTeams}
            disabled={!canGenerateTeams}
            className="button-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Shuffle size={20} />
            <span>
              {isGenerating
                ? t.teamGenerator?.generating || "Generating..."
                : t.teamGenerator.generateTeams}
            </span>
          </button>
          {teams.length > 0 && (
            <button
              onClick={resetTeams}
              className="button-secondary focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {t.teamGenerator?.resetTeams || "Reset Teams"}
            </button>
          )}
          {players.length > 0 && (
            <button
              onClick={clearAllPlayers}
              className="button-secondary text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {t.teamGenerator?.clearAll || "Clear All"}
            </button>
          )}
        </ToolControls>

        {!canGenerateTeams &&
          players.length > 0 &&
          players.length < teamSize && (
            <p className="text-amber-600 text-sm mt-2 text-center" role="alert">
              {interpolate(t.teamGenerator.notEnoughPlayers, {
                needed: teamSize.toString(),
              })}
            </p>
          )}
      </ToolSection>

      {/* Players List */}
      <ToolSection
        title={`${t.teamGenerator.players} (${players.length})`}
        icon={Users}
      >
        {players.length === 0 ? (
          <ToolDisplay size="large">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">{t.teamGenerator.noPlayers}</p>
          </ToolDisplay>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {players.map((player, index) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center min-w-0">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-900 truncate">{player.name}</span>
                </div>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-2 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
                  title={locale === "ja" ? "削除" : "Remove"}
                  aria-label={`Remove ${player.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </ToolSection>

      {/* Generated Teams */}
      {teams.length > 0 && (
        <ToolSection
          title={`${t.teamGenerator.teams} (${teams.length})`}
          icon={Users}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                style={{ borderColor: team.color }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: team.color }}
                  >
                    <Users size={16} className="text-white" />
                  </div>
                  <h4
                    className="text-lg font-bold"
                    style={{ color: team.color }}
                  >
                    {team.name}
                  </h4>
                  <span className="ml-auto text-sm text-gray-500">
                    ({team.players.length}{" "}
                    {t.teamGenerator?.playersUnit || "players"})
                  </span>
                </div>
                <div className="space-y-2">
                  {team.players.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                        {index + 1}
                      </div>
                      <span className="text-gray-900">{player.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ToolSection>
      )}
    </ToolLayout>
  );
}

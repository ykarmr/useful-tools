"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Trash2, Users, Shuffle, Plus, UserPlus } from "lucide-react";
import { interpolate, Locale, Translations } from "@/locales";

import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolInput from "@/components/layout/tool-input";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";

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

// プレイヤーカードコンポーネントをメモ化
interface PlayerCardProps {
  player: Player;
  index: number;
  onRemove: (id: string) => void;
  locale: Locale;
}

const PlayerCard = ({ player, index, onRemove, locale }: PlayerCardProps) => (
  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl hover:from-gray-50 hover:to-gray-100 transition-all duration-200 group shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300">
    <div className="flex items-center min-w-0 flex-1">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 shadow-lg">
        {index + 1}
      </div>
      <span className="text-gray-900 truncate font-medium text-base">
        {player.name}
      </span>
    </div>
    <button
      onClick={() => onRemove(player.id)}
      className="text-gray-400 hover:text-red-500 transition-colors ml-3 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-lg p-2 flex-shrink-0"
      title={locale === "ja" ? "削除" : "Remove"}
      aria-label={`Remove ${player.name}`}
    >
      <Trash2 size={16} />
    </button>
  </div>
);

// TeamCard コンポーネントをメモ化
interface TeamCardProps {
  team: Team;
  t: Translations;
}

const TeamCard = ({ team, t }: TeamCardProps) => (
  <div
    className="bg-white border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    style={{ borderColor: team.color }}
  >
    <div className="flex items-center mb-6">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg"
        style={{ backgroundColor: team.color }}
      >
        <Users size={20} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className="text-xl font-bold truncate"
          style={{ color: team.color }}
        >
          {team.name}
        </h4>
        <span className="text-sm text-gray-500 font-medium">
          {team.players.length} {t.teamGenerator?.playersUnit || "players"}
        </span>
      </div>
    </div>
    <div className="space-y-3">
      {team.players.map((player, index) => (
        <div
          key={player.id}
          className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 shadow-md text-white"
            style={{ backgroundColor: team.color }}
          >
            {index + 1}
          </div>
          <span className="text-gray-900 truncate font-medium">
            {player.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

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

  // ローカルストレージキーをメモ化
  const storageKey = useMemo(
    () => `team-generator-players-${locale}`,
    [locale]
  );

  // プレイヤーデータの読み込み
  useEffect(() => {
    const savedPlayers = localStorage.getItem(storageKey);
    if (savedPlayers) {
      try {
        setPlayers(JSON.parse(savedPlayers));
      } catch (error) {
        console.error("Failed to load saved players:", error);
        setPlayers([]);
      }
    }
  }, [storageKey]);

  // プレイヤーデータの保存（debounce機能付き）
  useEffect(() => {
    if (players.length === 0) return;

    const saveTimer = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(players));
    }, 300); // 300ms後に保存

    return () => clearTimeout(saveTimer);
  }, [players, storageKey]);

  // プレイヤー追加処理をuseCallbackでメモ化
  const addPlayer = useCallback(() => {
    const trimmedName = newPlayerName.trim();
    if (!trimmedName) return;

    // 重複チェック
    const isDuplicate = players.some(
      (player) => player.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert(
        t.teamGenerator?.duplicatePlayerError ||
          "A player with this name already exists"
      );
      return;
    }

    const newPlayer: Player = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: trimmedName,
    };

    setPlayers((prev) => [...prev, newPlayer]);
    setNewPlayerName("");
  }, [newPlayerName, players, t.teamGenerator?.duplicatePlayerError]);

  // キーボードイベントハンドラーをメモ化
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addPlayer();
      }
    },
    [addPlayer]
  );

  // プレイヤー削除処理をuseCallbackでメモ化
  const removePlayer = useCallback((id: string) => {
    setPlayers((prev) => prev.filter((player) => player.id !== id));
    // プレイヤー削除時にチームをリセット
    setTeams([]);
  }, []);

  // Fisher-Yatesシャッフルアルゴリズムを関数として分離
  const shuffleArray = useCallback(function <T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // チーム生成処理を最適化
  const generateTeams = useCallback(() => {
    if (players.length < teamSize) return;

    setIsGenerating(true);

    // 非同期処理で重い計算をメインスレッドをブロックしないようにする
    const processTeamGeneration = () => {
      try {
        // プレイヤーをシャッフル
        const shuffledPlayers = shuffleArray(players);

        const numberOfCompleteTeams = Math.floor(
          shuffledPlayers.length / teamSize
        );
        const newTeams: Team[] = [];

        // 完全なチームを作成
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

        // 余ったプレイヤーの処理
        const remainingPlayers = shuffledPlayers.slice(
          numberOfCompleteTeams * teamSize
        );
        if (remainingPlayers.length > 0 && newTeams.length > 0) {
          // 余ったプレイヤーを既存チームに均等に分散
          remainingPlayers.forEach((player, index) => {
            const teamIndex = index % newTeams.length;
            newTeams[teamIndex].players.push(player);
          });
        } else if (remainingPlayers.length > 0 && newTeams.length === 0) {
          // 完全なチームが作れない場合、全プレイヤーで1チーム作成
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
    };

    // UIの応答性を保つため少し遅延を入れる
    setTimeout(processTeamGeneration, 100);
  }, [
    players,
    teamSize,
    shuffleArray,
    t.teamGenerator?.defaultTeamName,
    t.teamGenerator?.failedToGenerate,
  ]);

  // その他の処理もuseCallbackでメモ化
  const resetTeams = useCallback(() => {
    setTeams([]);
  }, []);

  const clearAllPlayers = useCallback(() => {
    if (
      confirm(
        t.teamGenerator?.confirmClearAll ||
          "Are you sure you want to remove all players?"
      )
    ) {
      setPlayers([]);
      setTeams([]);
    }
  }, [t.teamGenerator?.confirmClearAll]);

  // 計算結果をメモ化
  const canGenerateTeams = useMemo(
    () => players.length >= teamSize && !isGenerating,
    [players.length, teamSize, isGenerating]
  );
  const remainingPlayers = useMemo(
    () => players.length % teamSize,
    [players.length, teamSize]
  );
  const numberOfTeams = useMemo(
    () => Math.floor(players.length / teamSize),
    [players.length, teamSize]
  );

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.teamGenerator.title}
      subtitle={t.teamGenerator.subtitle}
      description={t.teamGenerator.description}
      icon={Users}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.teamGenerator.howToUse.title}
          steps={t.teamGenerator.howToUse.steps}
          features={t.teamGenerator.features}
        />
      </ToolSection>

      {/* Add Players Section */}
      <ToolSection title={t.teamGenerator.addPlayer} icon={UserPlus}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* プレイヤー追加 */}
            <div className="space-y-4">
              <ToolInput label={t.teamGenerator.playerName}>
                <div className="flex gap-3 sm:gap-4">
                  <input
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.teamGenerator.playerName}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500"
                    maxLength={30}
                  />
                  <button
                    onClick={addPlayer}
                    disabled={!newPlayerName.trim()}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center gap-2 min-w-[120px] justify-center"
                  >
                    <Plus size={18} />
                    {t.common.add}
                  </button>
                </div>
              </ToolInput>
            </div>

            {/* チームサイズ設定 */}
            <div className="space-y-4">
              <ToolInput label={t.teamGenerator.teamSize}>
                <select
                  value={teamSize}
                  onChange={(e) => {
                    setTeamSize(Number.parseInt(e.target.value));
                    setTeams([]); // Reset teams when team size changes
                  }}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-full bg-white shadow-sm hover:shadow-md text-gray-900"
                >
                  {[2, 3, 4, 5, 6, 7, 8].map((size) => (
                    <option key={size} value={size}>
                      {size} {t.teamGenerator.players}
                    </option>
                  ))}
                </select>
              </ToolInput>
            </div>
          </div>

          {/* Team Generation Info */}
          {players.length > 0 && (
            <div className="mt-8">
              <ToolDisplay background="light" size="small">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Users size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
                        {t.teamGenerator?.teamGenerationInfo ||
                          "Team Generation Info:"}
                      </h4>
                      <div className="space-y-2 text-blue-800">
                        <div className="flex items-center gap-2 text-base">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {interpolate(
                            t.teamGenerator?.teamsOfPlayers ||
                              "{teams} teams of {size} players each",
                            {
                              teams: numberOfTeams.toString(),
                              size: teamSize.toString(),
                            }
                          )}
                        </div>
                        {remainingPlayers > 0 && (
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-3">
                            <div className="flex items-center gap-2 text-amber-700">
                              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                              {interpolate(
                                t.teamGenerator?.remainingPlayersDistributed ||
                                  "{remaining} remaining players will be distributed to existing teams",
                                {
                                  remaining: remainingPlayers.toString(),
                                }
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ToolDisplay>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={generateTeams}
              disabled={!canGenerateTeams}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center gap-3 min-w-[180px] justify-center text-lg"
            >
              <Shuffle size={22} />
              <span>
                {isGenerating
                  ? t.teamGenerator?.generating || "Generating..."
                  : t.teamGenerator.generateTeams}
              </span>
            </button>

            {teams.length > 0 && (
              <button
                onClick={resetTeams}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                {t.teamGenerator?.resetTeams || "Reset Teams"}
              </button>
            )}

            {players.length > 0 && (
              <button
                onClick={clearAllPlayers}
                className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-6 py-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 border border-red-200 hover:border-red-300 flex items-center gap-2"
              >
                <Trash2 size={18} />
                {t.teamGenerator?.clearAll || "Clear All"}
              </button>
            )}
          </div>

          {/* Insufficient Players Warning */}
          {!canGenerateTeams &&
            players.length > 0 &&
            players.length < teamSize && (
              <div className="mt-6">
                <div
                  className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl py-5 px-6 shadow-sm"
                  role="alert"
                >
                  <div className="flex items-center justify-center gap-3 text-amber-700">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-amber-600" />
                    </div>
                    <span className="font-semibold text-lg">
                      {interpolate(t.teamGenerator.notEnoughPlayers, {
                        needed: teamSize.toString(),
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}
        </div>
      </ToolSection>

      {/* Players List */}
      <ToolSection
        title={`${t.teamGenerator.players} (${players.length})`}
        icon={Users}
      >
        {players.length === 0 ? (
          <ToolDisplay size="large">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Users className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t.teamGenerator.noPlayers}
              </h3>
              <p className="text-gray-500 text-base">
                {t.teamGenerator.noPlayersDescription}
              </p>
            </div>
          </ToolDisplay>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {players.map((player, index) => (
              <PlayerCard
                key={player.id}
                player={player}
                index={index}
                onRemove={removePlayer}
                locale={locale}
              />
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
              <TeamCard key={team.id} team={team} t={t} />
            ))}
          </div>
        </ToolSection>
      )}

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.teamGenerator.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}

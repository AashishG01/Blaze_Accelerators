import { useApp } from '../context/AppContext';
import learningData from '../data/learningData';

export default function LearnScreen() {
  const { navigate, dispatch, completedModules, xp, streakCount } = useApp();

  // Flatten all modules to determine sequential unlock
  const allModules = learningData.flatMap((world, wi) =>
    world.modules.map((mod, mi) => ({ ...mod, worldIndex: wi, moduleIndex: mi }))
  );

  // A module is unlocked if: it's the first module OR the previous module is completed
  const isUnlocked = (flatIndex) => {
    if (flatIndex === 0) return true;
    return completedModules.includes(allModules[flatIndex - 1].id);
  };

  const isCompleted = (moduleId) => completedModules.includes(moduleId);

  // Overall progress
  const totalModules = allModules.length;
  const completedCount = completedModules.length;
  const progressPct = Math.round((completedCount / totalModules) * 100);

  // XP level system
  const xpPerLevel = 200;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const xpInLevel = xp % xpPerLevel;
  const xpLevelPct = (xpInLevel / xpPerLevel) * 100;

  const handleModuleClick = (moduleId, flatIndex) => {
    if (!isUnlocked(flatIndex) && !isCompleted(moduleId)) return;
    dispatch({ type: 'START_MODULE', moduleId });
    navigate('module');
  };

  let flatIdx = 0;

  return (
    <section className="screen learn-screen">
      {/* Header */}
      <div className="learn-header">
        <div className="learn-header-left">
          <h2 className="learn-title">Finance Academy</h2>
          <p className="learn-subtitle">{completedCount}/{totalModules} modules completed</p>
        </div>
        <div className="learn-header-stats">
          <div className="learn-stat">
            <span className="learn-stat-icon">🔥</span>
            <span className="learn-stat-value">{streakCount}</span>
          </div>
          <div className="learn-stat">
            <span className="learn-stat-icon">⚡</span>
            <span className="learn-stat-value">{xp}</span>
          </div>
        </div>
      </div>

      {/* XP Level Bar */}
      <div className="learn-xp-bar-section">
        <div className="learn-xp-level">Level {level}</div>
        <div className="learn-xp-track">
          <div className="learn-xp-fill" style={{ width: `${xpLevelPct}%` }} />
        </div>
        <div className="learn-xp-text">{xpInLevel}/{xpPerLevel} XP</div>
      </div>

      {/* Progress Bar */}
      <div className="learn-progress-bar">
        <div className="learn-progress-fill" style={{ width: `${progressPct}%` }} />
        <span className="learn-progress-label">{progressPct}% Complete</span>
      </div>

      {/* World Map */}
      <div className="learn-map">
        {learningData.map((world, worldIdx) => {
          const worldStartIdx = flatIdx;
          return (
            <div key={world.id} className="learn-world">
              {/* World Banner */}
              <div className="learn-world-banner" style={{ '--world-color': world.color }}>
                <span className="learn-world-emoji">{world.emoji}</span>
                <div className="learn-world-info">
                  <div className="learn-world-title">{world.title}</div>
                  <div className="learn-world-desc">{world.description}</div>
                </div>
                <div className="learn-world-progress">
                  {world.modules.filter(m => isCompleted(m.id)).length}/{world.modules.length}
                </div>
              </div>

              {/* Module Nodes Path */}
              <div className="learn-path">
                {/* SVG Winding Path */}
                <svg className="learn-path-svg" viewBox="0 0 300 100" preserveAspectRatio="none"
                  style={{ height: `${world.modules.length * 100}px` }}>
                  {world.modules.map((_, mi) => {
                    const totalMods = world.modules.length;
                    const y1 = (mi / totalMods) * 100;
                    const y2 = ((mi + 1) / totalMods) * 100;
                    const x1 = mi % 2 === 0 ? 35 : 65;
                    const x2 = (mi + 1) % 2 === 0 ? 35 : 65;
                    if (mi >= totalMods - 1) return null;
                    return (
                      <line
                        key={mi}
                        x1={`${x1}%`} y1={`${y1 + 50 / totalMods}%`}
                        x2={`${x2}%`} y2={`${y2 + 50 / totalMods}%`}
                        className={`learn-path-line ${
                          isCompleted(world.modules[mi].id) && (isCompleted(world.modules[mi + 1].id) || isUnlocked(worldStartIdx + mi + 1))
                            ? 'active'
                            : ''
                        }`}
                      />
                    );
                  })}
                </svg>

                {/* Module Nodes */}
                {world.modules.map((mod, mi) => {
                  const currentFlat = flatIdx++;
                  const completed = isCompleted(mod.id);
                  const unlocked = isUnlocked(currentFlat);
                  const isCurrent = unlocked && !completed;
                  const side = mi % 2 === 0 ? 'left' : 'right';

                  return (
                    <div
                      key={mod.id}
                      className={`learn-node ${side} ${completed ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${!unlocked && !completed ? 'locked' : ''}`}
                      onClick={() => handleModuleClick(mod.id, currentFlat)}
                    >
                      <div className="learn-node-circle">
                        {completed ? (
                          <span className="learn-node-check">✓</span>
                        ) : !unlocked ? (
                          <span className="learn-node-lock">🔒</span>
                        ) : (
                          <span className="learn-node-emoji">{mod.emoji}</span>
                        )}
                      </div>
                      <div className="learn-node-label">
                        <div className="learn-node-title">{mod.title}</div>
                        {completed && (
                          <div className="learn-node-xp">+{mod.xpReward} XP ✓</div>
                        )}
                        {isCurrent && (
                          <div className="learn-node-start">START →</div>
                        )}
                        {!unlocked && !completed && (
                          <div className="learn-node-locked-text">Locked</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

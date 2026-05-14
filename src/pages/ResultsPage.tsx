import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { FaMusic, FaArrowLeft, FaShare, FaDownload, FaBolt, FaGlobe, FaHeartbeat, FaWaveSquare } from 'react-icons/fa';
import { getToneLabel, getToneColor, getToneDescription } from '@/utils/toneClassifier';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, RadialBarChart, RadialBar, PolarRadiusAxis } from 'recharts';

export const ResultsPage = () => {
  const navigate = useNavigate();
  const { analysisResult, isAnalyzing } = useStore();

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="text-center">
          <LoadingSpinner size="lg" text="Analyzing your song..." />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-400"
          >
            Detecting tempo, analyzing lyrics, and classifying tone...
          </motion.p>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="text-center">
          <p className="text-xl text-gray-400 mb-6">No analysis data available</p>
          <Button onClick={() => navigate('/')}>
            <FaArrowLeft />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const { song, analysis, similarSongs } = analysisResult;

  // Prepare emotion data for radar chart
  const emotionData = Object.entries(analysis.emotions).map(([emotion, value]) => ({
    emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
    value: Math.round(value),
  }));

  // Prepare tempo data for bar chart
  const tempoData = [
    { name: 'BPM', value: analysis.tempo.bpm },
    { name: 'Energy', value: analysis.tempo.energyLevel },
    { name: 'Consistency', value: analysis.tempo.consistency },
  ];

  const audioProfileData = [
    { name: 'Energy', value: analysis.tempo.energyLevel },
    { name: 'Consistency', value: analysis.tempo.consistency },
    { name: 'Danceability', value: Math.round((analysis.musicalCharacteristics.danceability || 0) * 100) },
    { name: 'Acousticness', value: Math.round((analysis.musicalCharacteristics.acousticness || 0) * 100) },
    { name: 'Instrumental', value: Math.round((analysis.musicalCharacteristics.instrumentalness || 0) * 100) },
  ];

  const sentimentPercent = Math.round(((analysis.lyrics.sentimentScore + 1) / 2) * 100);
  const sentimentGaugeData = [{ name: 'Sentiment', value: sentimentPercent, fill: getToneColor(analysis.primaryTone) }];
  const primaryColor = getToneColor(analysis.primaryTone);

  const summaryMetrics = [
    { label: 'BPM', value: analysis.tempo.bpm, detail: analysis.tempo.tempoCategory.replace('-', ' '), icon: <FaWaveSquare /> },
    { label: 'Energy', value: `${analysis.tempo.energyLevel}%`, detail: 'audio intensity', icon: <FaBolt /> },
    { label: 'Confidence', value: `${Math.round(analysis.confidence * 100)}%`, detail: 'tone match', icon: <FaHeartbeat /> },
    { label: 'Language', value: analysis.lyrics.language, detail: analysis.lyrics.hasLyrics ? 'text detected' : 'from title', icon: <FaGlobe /> },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <AnimatedBackground />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors mb-4 flex items-center gap-2"
          >
            <FaArrowLeft />
            Analyze Another Song
          </button>
        </motion.div>

        {/* Song Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-primary-purple/10 to-primary-blue/10">
            <div className="flex items-center gap-6">
              {song.albumArt ? (
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  src={song.albumArt}
                  alt={song.title}
                  className="w-32 h-32 rounded-xl object-cover shadow-2xl"
                />
              ) : (
                <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary-purple to-primary-blue flex items-center justify-center shadow-2xl">
                  <FaMusic className="text-5xl" />
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{song.title}</h1>
                <p className="text-xl text-gray-400 mb-3">{song.artist}</p>
                {song.album && <p className="text-sm text-gray-500">{song.album}</p>}
                {song.previewUrl && (
                  <div className="mt-4 max-w-xl">
                    <p className="text-sm text-gray-400 mb-2">Listen to uploaded audio</p>
                    <audio controls className="w-full" src={song.previewUrl}>
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <FaShare />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <FaDownload />
                  Export
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Primary Tone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at center, ${primaryColor}, transparent)`,
              }}
            />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="inline-block mb-4"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl"
                  style={{ backgroundColor: primaryColor }}
                >
                  {Math.round(analysis.confidence * 100)}%
                </div>
              </motion.div>

              <h2 className="text-3xl font-bold mb-2">
                Primary Tone: <span style={{ color: primaryColor }}>{getToneLabel(analysis.primaryTone)}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-4">
                {getToneDescription(analysis.primaryTone)}
              </p>

              <div className="flex items-center justify-center gap-4 flex-wrap">
                {analysis.secondaryTones.map((tone, index) => (
                  <motion.div
                    key={tone}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="glass-effect px-4 py-2 rounded-lg"
                  >
                    <span className="text-sm text-gray-400">Secondary: </span>
                    <span className="font-semibold" style={{ color: getToneColor(tone) }}>
                      {getToneLabel(tone)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {summaryMetrics.map((metric, index) => (
            <Card key={metric.label} hover={false}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-start justify-between gap-3"
              >
                <div>
                  <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>{metric.value}</p>
                  <p className="text-xs text-gray-500 capitalize mt-1">{metric.detail}</p>
                </div>
                <div className="text-xl" style={{ color: primaryColor }}>
                  {metric.icon}
                </div>
              </motion.div>
            </Card>
          ))}
        </motion.div>

        {/* Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Emotion Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="text-2xl font-bold mb-6">Emotion Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={emotionData}>
                  <PolarGrid stroke="#ffffff20" />
                  <PolarAngleAxis dataKey="emotion" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Radar
                    name="Emotions"
                    dataKey="value"
                    stroke={primaryColor}
                    fill={primaryColor}
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Tempo Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h3 className="text-2xl font-bold mb-6">Tempo Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tempoData}>
                  <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
                  <YAxis tick={{ fill: '#9CA3AF' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1A2E',
                      border: '1px solid #ffffff20',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {tempoData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={primaryColor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card>
              <h3 className="text-2xl font-bold mb-6">Audio Profile</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={audioProfileData} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9CA3AF' }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#9CA3AF' }} width={90} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1A2E',
                      border: '1px solid #ffffff20',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} fill={primaryColor} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h3 className="text-2xl font-bold mb-6">Sentiment Signal</h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <ResponsiveContainer width="100%" height={260}>
                  <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    data={sentimentGaugeData}
                    startAngle={180}
                    endAngle={0}
                  >
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    <RadialBar background dataKey="value" cornerRadius={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1A1A2E',
                        border: '1px solid #ffffff20',
                        borderRadius: '8px',
                      }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="text-center md:text-left w-full md:w-auto">
                  <p className="text-sm text-gray-400 mb-1">Detected language</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>{analysis.lyrics.language}</p>
                  <p className="text-sm text-gray-400 mt-4 mb-1">Sentiment</p>
                  <p className="text-xl font-semibold capitalize">{analysis.lyrics.sentiment}</p>
                  <p className="text-sm text-gray-500 mt-2">Signal strength {sentimentPercent}%</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-4">Detailed Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tempo Details */}
            <Card hover={false}>
              <h4 className="font-bold text-lg mb-3 text-primary-purple">Tempo</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">BPM:</span>
                  <span className="font-semibold">{analysis.tempo.bpm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="font-semibold capitalize">{analysis.tempo.tempoCategory.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Energy:</span>
                  <span className="font-semibold">{analysis.tempo.energyLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Consistency:</span>
                  <span className="font-semibold">{analysis.tempo.consistency}%</span>
                </div>
              </div>
            </Card>

            {/* Lyrics Details */}
            <Card hover={false}>
              <h4 className="font-bold text-lg mb-3 text-primary-blue">Lyrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sentiment:</span>
                  <span className="font-semibold capitalize">{analysis.lyrics.sentiment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Score:</span>
                  <span className="font-semibold">{analysis.lyrics.sentimentScore.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span className="font-semibold uppercase">{analysis.lyrics.language}</span>
                </div>
                <div>
                  <span className="text-gray-400">Themes:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analysis.lyrics.themes.slice(0, 3).map((theme) => (
                      <span key={theme} className="glass-effect px-2 py-1 rounded text-xs">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Musical Characteristics */}
            <Card hover={false}>
              <h4 className="font-bold text-lg mb-3 text-primary-pink">Musical</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Key:</span>
                  <span className="font-semibold">{analysis.musicalCharacteristics.key}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mode:</span>
                  <span className="font-semibold capitalize">{analysis.musicalCharacteristics.mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time Signature:</span>
                  <span className="font-semibold">{analysis.musicalCharacteristics.timeSignature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Danceability:</span>
                  <span className="font-semibold">{Math.round((analysis.musicalCharacteristics.danceability || 0) * 100)}%</span>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Similar Songs */}
        {similarSongs && similarSongs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Similar Songs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarSongs.slice(0, 6).map((similarSong, index) => (
                <motion.div
                  key={similarSong.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <Card>
                    <div className="flex items-center gap-3">
                      {similarSong.albumArt ? (
                        <img
                          src={similarSong.albumArt}
                          alt={similarSong.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-purple to-primary-blue flex items-center justify-center">
                          <FaMusic />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold truncate">{similarSong.title}</h4>
                        <p className="text-sm text-gray-400 truncate">{similarSong.artist}</p>
                        <p className="text-xs text-primary-purple">
                          {Math.round(similarSong.similarity * 100)}% match
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

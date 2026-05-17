import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch, FaUpload } from 'react-icons/fa';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Song } from '@/types';
import { useStore } from '@/store/useStore';
import { musicService } from '@/services/musicService';
import { analysisService } from '@/services/analysisService';

export const AnalyzePage = () => {
  const { method } = useParams<{ method: string }>();
  const navigate = useNavigate();
  const { setCurrentSong, setIsAnalyzing, setAnalysisResult, addToHistory, setError } = useStore();

  const [titleInput, setTitleInput] = useState('');
  const [artistInput, setArtistInput] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSearch = async () => {
    const title = titleInput.trim();
    const artist = artistInput.trim();
    if (!title) return;

    try {
      setIsSearching(true);
      const results = await musicService.searchSong(title, artist || undefined);
      setSearchResults(results);
    } catch (error) {
      setError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSongSelect = async (song: Song) => {
    try {
      setIsAnalyzing(true);
      setCurrentSong(song);
      navigate('/results');

      const result = await analysisService.analyzeSong(song);
      setAnalysisResult(result);
      addToHistory(result);
    } catch (error) {
      setError('Failed to analyze song. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid audio file (MP3, WAV, M4A)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    try {
      setIsAnalyzing(true);
      const song = {
        id: 'upload-' + Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'Unknown Artist',
        platform: 'upload' as const,
        previewUrl: URL.createObjectURL(file),
      };

      setCurrentSong(song);
      navigate('/results');

      const result = await analysisService.analyzeSong(song, file);
      setAnalysisResult(result);
      addToHistory(result);
    } catch (error) {
      setError('Failed to analyze file. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      handleFileUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      handleFileUpload(file);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <AnimatedBackground />

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors mb-4"
          >
            ← Back to Home
          </button>

          <h1 className="text-4xl font-bold mb-2">
            {method === 'search' && 'Search & Analyze'}
            {method === 'upload' && 'Upload & Analyze'}
          </h1>
          <p className="text-gray-400">
            {method === 'search' && 'Input song title and singer to get YouTube recommendations'}
            {method === 'upload' && 'Upload an audio file for analysis'}
          </p>
        </motion.div>

        {/* Search Input */}
        {method === 'search' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <Card>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Song Title</label>
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="e.g. Perfect"
                    className="input-field w-full mb-3"
                  />
                  <label className="block text-sm font-semibold mb-2">Singer / Artist</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={artistInput}
                      onChange={(e) => setArtistInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="e.g. Ed Sheeran"
                      className="input-field flex-1"
                    />
                    <Button onClick={handleSearch} disabled={isSearching || !titleInput.trim()}>
                      <FaSearch />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Search Results */}
            {isSearching && (
              <div className="flex justify-center py-12">
                <LoadingSpinner text="Searching..." />
              </div>
            )}

            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <h3 className="text-xl font-bold">Recommended Matches</h3>
                {searchResults.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card onClick={() => handleSongSelect(song)}>
                      <div className="flex items-center gap-4">
                        {song.albumArt ? (
                          <img
                            src={song.albumArt}
                            alt={song.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-purple to-primary-blue flex items-center justify-center">
                            <FaSearch className="text-2xl" />
                          </div>
                        )}

                        <div className="flex-1">
                          <h4 className="font-bold">{song.title}</h4>
                          <p className="text-sm text-gray-400">{song.artist}</p>
                          {song.album && (
                            <p className="text-xs text-gray-500">{song.album}</p>
                          )}
                        </div>

                        <div className="text-primary-purple">→</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* File Upload */}
        {method === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive
                    ? 'border-primary-purple bg-primary-purple/10'
                    : 'border-gray-600 hover:border-primary-purple/50'
                }`}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <FaUpload className="text-6xl text-primary-purple mx-auto" />
                </motion.div>

                <h3 className="text-xl font-bold mb-2">
                  {dragActive ? 'Drop your file here' : 'Drag & Drop your audio file'}
                </h3>
                <p className="text-gray-400 mb-6">or click to browse</p>

                <input
                  type="file"
                  id="file-upload"
                  accept="audio/mpeg,audio/wav,audio/mp4,audio/m4a"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <label htmlFor="file-upload">
                  <span className="font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-purple to-primary-blue text-white py-3 px-6 text-base cursor-pointer hover:shadow-lg hover:shadow-primary-purple/50">
                    <FaUpload />
                    Choose File
                  </span>
                </label>

                <div className="mt-6 text-sm text-gray-500">
                  <p>Supported formats: MP3, WAV, M4A</p>
                  <p>Maximum file size: 10MB</p>
                </div>

                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 glass-effect rounded-lg p-4"
                  >
                    <p className="font-semibold">Selected: {selectedFile.name}</p>
                    <p className="text-sm text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

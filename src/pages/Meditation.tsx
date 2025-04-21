<<<<<<< HEAD
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Structure from '../components/Structure';
import { handleLogin } from '../helper/helperFunctions';
import { MeditationProps } from '../helper/props';
import axios from 'axios';
import MusicDetail from '../components/MusicDetail';
import { useSpotify } from '../context/SpotifyContext';
import placeholder from '/images/placeholder.jpg';
import PlaylistCard from '../components/PlaylistCard';

const Meditation: React.FC<MeditationProps> = ({ userName, onSearch, searchQuery }) => {
  const { isSpotifyConnected, fetchPlaylists, fetchTracks, handleTrackUri } = useSpotify();
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [filteredPlaylists, setFilteredPlaylists] = useState<any[]>([]);
  const [selectedPlaylistUri, setSelectedPlaylistUri] = useState<string | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<any[]>([]);
  const spotifyToken = localStorage.getItem('spotify_token');
  const userId = localStorage.getItem('userId') || '';
=======
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Structure from "../components/Structure";
import { handleLogin } from "../helper/helperFunctions";
import { MeditationProps } from "../helper/props";
import axios from "axios";
import MusicDetail from "../components/MusicDetail";
import { useSpotify } from "../context/SpotifyContext";
import placeholder from "/images/placeholder.jpg";
import PlaylistCard from "../components/PlaylistCard"; 

const Meditation: React.FC<MeditationProps> = ({
  userName,
  onSearch,
  searchQuery,
}) => {
  const { isSpotifyConnected, fetchPlaylists, fetchTracks, handleTrackUri } =
    useSpotify();
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [filteredPlaylists, setFilteredPlaylists] = useState<any[]>([]);
  const [selectedPlaylistUri, setSelectedPlaylistUri] = useState<string | null>(
    null
  );
  const [selectedTracks, setSelectedTracks] = useState<any[]>([]);
  const spotifyToken = localStorage.getItem("spotify_token");
  const userId = localStorage.getItem("userId") || "";
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        let fetchedPlaylists: any[] = [];

        if (!activeIcon) {
<<<<<<< HEAD
          fetchedPlaylists = await fetchPlaylists('meditate');
        } else if (activeIcon.toLowerCase() === 'favorites') {
          const response = await axios.get('/user/spotify-favorites/details', {
=======
          fetchedPlaylists = await fetchPlaylists("meditate");
        } else if (activeIcon.toLowerCase() === "favorites") {
          const response = await axios.get("/user/spotify-favorites/details", {
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
            headers: { Authorization: `Bearer ${spotifyToken}` },
            params: { userId },
          });
          if (response) {
            fetchedPlaylists = response.data || [];
          } else {
            return [];
          }
<<<<<<< HEAD
        } else if (activeIcon.toLowerCase() === 'all') {
          const queries = ['anxious', 'sleep', 'child', 'yoga', 'meditate'];
          const allPlaylists = await Promise.all(queries.map(query => fetchPlaylists(query)));
=======
        } else if (activeIcon.toLowerCase() === "all") {
          const queries = ["anxious", "sleep", "child", "yoga", "meditate"];
          const allPlaylists = await Promise.all(
            queries.map((query) => fetchPlaylists(query))
          );
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
          fetchedPlaylists = allPlaylists.flat();
        } else {
          const searchTerm = activeIcon.toLowerCase();
          fetchedPlaylists = await fetchPlaylists(searchTerm);
        }

        if (searchQuery) {
          const lowercasedQuery = searchQuery.toLowerCase();
          setFilteredPlaylists(
            fetchedPlaylists.filter((playlist: any) =>
              playlist.name?.toLowerCase().includes(lowercasedQuery)
            )
          );
        } else {
          setFilteredPlaylists(fetchedPlaylists);
        }
      } catch (error) {
<<<<<<< HEAD
        console.error('Error loading playlists:', error);
=======
        console.error("Error loading playlists:", error);
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
      }
    };

    loadPlaylists();
  }, [activeIcon, fetchPlaylists, spotifyToken, searchQuery]);

  const handleViewTracks = (playlistId: string, playlistUri: string) => {
    setSelectedPlaylistUri(playlistUri);
    fetchTracks(playlistId).then(setSelectedTracks);
  };

  return (
    <div>
      <Structure
        title="Meditate"
        description="Audio-only meditation techniques to help you relax."
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
        onSearch={onSearch}
      />
      {isSpotifyConnected ? (
        <div className="mt-16 flex flex-col items-center w-full">
          <div className="flex flex-wrap gap-8 items-start w-full px-10 pb-60">
            {filteredPlaylists
              .filter((playlist: any) => playlist && playlist.id)
              .map((playlist: any, index) => (
                <PlaylistCard
                  key={`${playlist.id}-${index}`}
                  playlist={playlist}
                  placeholder={placeholder}
                  handleViewTracks={handleViewTracks}
                  index={index}
                />
              ))}
          </div>
          {selectedTracks.length > 0 && (
            <MusicDetail
              tracks={selectedTracks}
<<<<<<< HEAD
              playlistUri={selectedPlaylistUri || ''}
=======
              playlistUri={selectedPlaylistUri || ""}
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
              handleTrackUri={handleTrackUri}
              userId={userId}
              onClose={() => {
                setSelectedTracks([]);
                setSelectedPlaylistUri(null);
              }}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col text-balance items-center mt-20 justify-center gap-10 rounded-xl bg-gray-400 h-96 ml-8 mr-8">
          <h3 className="text-4xl text-white text-center font-semibold">
            Connect to Spotify to get audio guided playlists
          </h3>
          <img
            src="/images/spotify-login.png"
            alt="Spotify Login"
            className="h-16 w-auto cursor-pointer"
            onClick={() => handleLogin()}
          />
        </div>
      )}
      <Navbar userName={userName} />
    </div>
  );
};

export default Meditation;

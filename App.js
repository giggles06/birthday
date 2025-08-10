/*
  Birthday Surprise — single-file React component (Tailwind CSS)
  - Restored the original violet/pink split-screen lock layout exactly as requested.
  - The lock screen shows the Milk & Mocha pastel image on the right.
  - Password: "loveyoukuttu" (already set)
  - Replace MUSIC_SRC and PHOTOS with your own files in the public folder:
      /public/audio/birthday.mp3  (or change MUSIC_SRC)
      /public/images/milk-mocha-birthday-pastel.jpg  (preview image)
      /public/images/photo1.jpg, photo2.jpg, photo3.jpg (optional gallery)
*/
import "./styles.css";
import React, { useEffect, useRef, useState } from "react";

const DEFAULT_PASSWORD = "loveyoukuttu";
const MUSIC_SRC =
  "https://github.com/giggles06/birthday/raw/refs/heads/main/nilanila.mp3"; // put your music file here
const PHOTOS = ["/photo1.jpg", "/photo2.jpg", "/photo3.jpg", "/photo4.jpg"]; // replace with your pics

export default function BirthdaySurprise() {
  const [stage, setStage] = useState("locked"); // "locked" or "unlocked"
  const [passwordInput, setPasswordInput] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState("");
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const messages = [
    "Happyiee Birthday, my love! 🥳🎉",
    "Lucky that i got a handsome lil babyboy 🥰",
    "I made this little shurprishh just for u 🥺",
    "Wanna get some clues?😈",
    "Hint : Something that comes after me saying 'adheee.. oru karyam'",
  ];

  useEffect(() => {
    // small rotating hint while locked
    if (stage === "locked") {
      const t = setInterval(() => {
        setMessageIndex((i) => (i + 1) % messages.length);
      }, 3500);
      return () => clearInterval(t);
    }
  }, [stage]);

  function tryPassword(e) {
    e.preventDefault();
    setError("");
    if (passwordInput.trim() === DEFAULT_PASSWORD) {
      setStage("unlocked");
      // allow a moment after the user gesture and then try to play audio
      setTimeout(() => {
        playAudio();
      }, 100);
      setPasswordInput("");
    } else {
      setError("Oh nooo — but nice try babe 😏");
      setPasswordInput("");
    }
  }

  function playAudio() {
    if (!audioRef.current) return;
    const p = audioRef.current.play();
    if (p !== undefined) {
      p.then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  function pauseAudio() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-violet-700 to-pink-600 text-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <header className="mb-6" style={{ textAlign: "center" }}>
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ textAlign: "center" }}
          >
            A LITTLE SURPRISE FOR YOU ❤️
          </h1>
          <p
            className="mt-2 text-sm opacity-80"
            style={{ textAlign: "center" }}
          >
            Hehe !! Now enter the secret password to find out what is waiting
            for u 🎁🎀
          </p>
        </header>

        {/* Locked view (split screen) */}

        {stage === "locked" && (
          <div className="lock-screen">
            <div className="lock-left">
              <p>Hey handsome kuttu — ready for a little tease? 😋 </p>
              <p>{messages[messageIndex]}</p>
              <form onSubmit={tryPassword}>
                <input
                  type="text"
                  placeholder="Enter ur secret password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button type="submit">Unlock</button>
              </form>
              {error && <p>{error}</p>}
            </div>
            <div className="lock-right">
              <img src="1234.jpg" alt="Milk & Mocha birthday" />
            </div>
          </div>
        )}
        {/* Unlocked view */}
        {stage === "unlocked" && (
          <main
            className="w-full px-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              minHeight: "80vh", // keeps it vertically centered
            }}
          >
            {/* Centered Intro */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold ">
                Happieeeyy Bdayy, KUTTU Dearr !😘❤️
              </h2>
              <p className="text-lg mt-2">
                I am wishing u a most beutiful bday!✨🎊🤩 Adhhe Keep smiling
                throughout ketta!
              </p>
              <h3 className="text-2xl font-semibold mt-6">Shurprishh✨</h3>
              <p className="text-sm opacity-80 mt-2">
                Now u can Open your gift !
              </p>
            </div>

            {/* Music controls - centered */}
            <div className="flex justify-center items-center gap-3 mb-10">
              <button
                onClick={() => (playing ? pauseAudio() : playAudio())}
                className="rounded-full px-4 py-2 bg-white/10 hover:bg-white/20 transition"
              >
                {playing ? "Pause 🎵" : "Play 🎵"}
              </button>
              <button
                onClick={() => {
                  setStage("locked");
                  setPasswordInput("");
                  pauseAudio();
                }}
                className="text-xs opacity-80 hover:opacity-100"
              >
                Lock again
              </button>
            </div>

            {/* Two Columns: Personal message & Love note */}
            <section
              className="w-full px-8 mb-10"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center", // vertical center
                width: "100%",
                maxWidth: "900px", // keeps balance
                margin: "0 auto",
                padding: "0 2rem",
                gap: "2rem",
              }}
            >
              {/* Personal Messages (Left) */}
              <div
                className="rounded-xl p-6 bg-gradient-to-br from-white/10 to-white/5 shadow-lg flex-1"
                style={{
                  display: "flex:1",
                  textAlign: "left",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3 className="font-semibold text-lg mb-3"></h3>
                <div className="space-y-5"></div>
              </div>

              {/* Love Note (Right) */}
              <div
                className="rounded-2xl p-6 bg-gradient-to-r from-pink-600/20 to-purple-700/20 backdrop-blur-md shadow-lg flex-1"
                style={{
                  display: "flex:0",
                  textAlign: "center",
                  flexDirection: "center",
                  justifyContent: "center",
                }}
              >
                <h3 className="text-xl font-bold mb-4">
                  Kunju's Love note: 🥰🥺{" "}
                </h3>
                <p className="opacity-90 mb-4">
                  Adhee.. We are in longy disty and i can't even hug u on ur
                  bday🤧🤧.. so thought of making its special this way. Hope u
                  are happy seeing thiss😁😘.. Pinne know that i love uu shyoo
                  much and keep smiling always becoz ninta chiriyil aanella njn
                  veenath .. 🙈💖 so enne inim veezhthanam! okeyii?😈 Pinna vene
                  edak edak sescy attitude also itto. 😏🤡 Late anelum i am so
                  happy that u came into my life...🥰 U made my life the best. I
                  am lucky and moreover blessed that i got a chakakra and pookie
                  like uu..👽🎀. .Be my fav hooman and enne vitt pokalle
                  ketta!😭❤
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => alert("Pattichhe!🤣 Love u babe😁🎀")}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => setShowPhotos(true)}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    See photos
                  </button>
                </div>
              </div>
            </section>
            {/* Remaining content (Full Width Below) */}
            {showPhotos && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse", // aligns from right to left
                  gap: "10px", // spacing between images
                  flexWrap: "wrap", // allows multiple rows if needed
                  justifyContent: "flex-start", // align to right edge
                  marginTop: "1rem",
                }}
              >
                <img
                  src="photo1.jpg"
                  alt="Photo 1"
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
                <img
                  src="photo2.jpg"
                  alt="Photo 2"
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
                <img
                  src="photo3.jpg"
                  alt="Photo 3"
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
                <img
                  src="photo4.jpg"
                  alt="Photo 3"
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
            <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
          </main>
        )}

        <footer className="mt-6 text-xs opacity-70 text-center">
          Built with love ❤️ — Always Ur Kunju !🥰
        </footer>
      </div>
    </div>
  );
}

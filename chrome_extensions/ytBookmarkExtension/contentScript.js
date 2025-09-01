(() => {


    const videoStorer = (videoId) => {
        currentVideo = videoId;
    }

    const fetchBookmarks = () => {
        return new Promise((resolve) => {
            console.log("made it here");
            console.log(currentVideo);
            chrome.storage.sync.get("currentVideoId", (data) => {
                currentVideo = data["currentVideoId"];
                console.log(currentVideo);
                chrome.storage.sync.get([currentVideo], (obj) => {
                    resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]): []);
                }); 
            });
            console.log(currentVideo);
        });
    };


    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime)
        };
        console.log(newBookmark);

        currentVideoBookmarks = await fetchBookmarks();

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });
    };

    const getTime = t => {
        var date = new Date(0);
        date.setSeconds(t);
        
        return date.toISOString().substr(11, 8);
    };
 

    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;
        if (type == "NEW") {
            currentVideo = videoId;
            console.log("SET UP");
            chrome.storage.sync.set({ "currentVideoId" : currentVideo });
            newVideoLoaded();
        } else if (type == "PLAY") {
            youtubePlayer.currentTime = value
        } else if (type == "DELETE") {
            console.log(currentVideoBookmarks);
            currentVideoBookmarks = currentVideoBookmarks.filter((b) => b.time != value);
            console.log("newBookies:");
            console.log(currentVideoBookmarks);
            chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });

            response(currentVideoBookmarks);
        }
    })

    const newVideoLoaded = async () => {
        console.log("HEERRRRROO!!!");
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        currentVideoBookmarks = await fetchBookmarks();
        console.log(currentVideo);
        console.log(currentVideoBookmarks);

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls.appendChild(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
            
        }
    }

    newVideoLoaded();
    console.log(currentVideoBookmarks);

})();
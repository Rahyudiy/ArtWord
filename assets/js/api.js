const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const btn = document.getElementById("src-word");
const test = document.getElementById("speech");
const phon1 = document.getElementById("phonetics");
const phon2 = document.getElementById("phonetic");
const audioElement = document.getElementById("audioElement");
const details = document.getElementById("details");
const MAX_DEFINITIONS = 10;
AOS.init();

btn.addEventListener("click", () => {
  let inpword = document.getElementById("inp-word").value;
  fetch(`${url}${inpword}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      details.innerHTML = "";
      let definitionCount = 0;
      data.forEach((entry) => {
        entry.meanings.forEach((meaning) => {
          meaning.definitions.forEach((definition) => {
            if (definitionCount >= MAX_DEFINITIONS) return;

            details.innerHTML += ` 
            <div
            class="w-full capitalize md:py-[3vw] px-[1vw] py-[1vw] border-t-[0.2vw] font-serifM md:text-[1.5vw] text-[3vw] md:border-r-[0.2vw] border-[#757575]"
          >
            <h1>${meaning.partOfSpeech}</h1>
          </div>
          <div
            class="w-full h-full md:py-[3vw] py-[1vw] col-span-2 md:border-t-[0.2vw] md:border-r-[0.2vw] border-[#757575]"
          >
            <div class="">
              <h1 class="font-serifM md:text-[2vw] text-[4.5vw] p-[1vw] italic">
                Definition ;
              </h1>
              <h1
                class="font-serifM md:text-[2vw] text-[3.5vw] md:leading-[2.8vw] leading-[5vw] p-[1vw] italic"
              >
                ${definition.definition}
              </h1>
              <div
                class="font-serifM capitalize md:text-[1.1vw] text-[2vw] pt-[1vw] px-[1vw]"
              >
                <p class="">
                  Synonyms: ${
                    meaning.synonyms && meaning.synonyms.length > 0
                      ? meaning.synonyms.join(", ")
                      : "None"
                  }
                </p>
                <p class="">
                  Antonyms: ${
                    meaning.antonyms && meaning.antonyms.length > 0
                      ? meaning.antonyms.join(", ")
                      : "None"
                  }
                </p>
              </div>
            </div>
          </div>
          <div
            class="w-full md:py-[3vw] py-[2vw] h-full col-span-2  md:border-t-[0.2vw] border-[#757575] p-[1vw] italic"
          >
            <h1 class="font-serifM md:text-[2vw] text-[4vw] p-[1vw] italic">
              Example ;
            </h1>
            <h1 class="font-serifM md:text-[2vw] text-[3vw] leading-[2.8vw]">
              "${definition.example || ""}"
            </h1>
          </div>
`;
            definitionCount++; // Increment the definition counter
          });
        });
      });

      // Set other details like phonetic and audio
      phon1.innerHTML = `${data[0].phonetic}`;
      phon2.innerHTML = `${data[0].phonetic}`;
      test.innerHTML = `${data[0].meanings[0].partOfSpeech}`;
      const audioUrl = findAudioUrl(data[0].phonetics);
      audioElement.src = audioUrl;
    })
    .catch((error) => {
      console.error("No Such Word", error);
      details.innerHTML = `<div class="col-span-5 text-center">
      <h1 class="font-serifM md:text-[2vw] text-[4vw] mt-[5vw]">
        "It's like a missing puzzle piece in our vocabulary."
      </h1>
    </div>`;
    });
});

function findAudioUrl(phoneticsArray) {
  for (const phonetic of phoneticsArray) {
    if (phonetic.audio) {
      return `${phonetic.audio}`;
    }
  }
  return null; // Return null if no audio URL found
}

function speakWord() {
  audioElement.play();
}

document.getElementById("sound").addEventListener("click", speakWord);

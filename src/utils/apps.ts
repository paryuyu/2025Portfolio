import notepad from "/images/notepad.webp";
import notes from "/images/notes.webp";
import messages from "/images/messages.webp";

export const apps = [
  {
    name: "connect",
    description: "Contact form",
    image: messages,
    position:{
        top: 100,
        left: 100,
    },
  },{
    name: "projects",
    description: "My projects",
    image: notes,
    position:{
        top: 100,
        left: 100,
    },
  },{
    name: "about me",
    description: "About me",
    image: notepad,
    position:{
        top: 100,
        left: 100,
    },
  },{
    name: "networking",
    description: "Networking events",
    image: messages, // TODO: 네트워킹 전용 이미지 추가 필요
    position:{
        top: 100,
        left: 100,
    },
  }
]
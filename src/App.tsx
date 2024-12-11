// src/App.tsx
import { useState } from "react";
import { ParticipantsList } from "./components/ParticipantsList";
import { ParticipantForm } from "./components/ParticipantForm";
import { performDraw } from "./utils/performDraw";
import { sendEmails } from "./utils/emailHelper";

interface Participant {
  name: string;
  email: string;
  id: number;
}

interface Restrictions {
  [key: string]: string[];
}

export default function App() {
  /*    const [participants, setParticipants] = useState<Participant[]>([
        { name: "Juan", email: "juan@yopmail.com", id: 0 },
        { name: "Pedro", email: "pedro@yopmail.com", id: 1 },
        { name: "Maria", email: "maria@yopmail.com", id: 2 },
        { name: "Ana", email: "ana@yopmail.com", id: 3 },
    ]);*/
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [restrictions, setRestrictions] = useState<Restrictions>({});

  const addParticipant = (participant: Participant) => {
    setParticipants([...participants, participant]);
  };

  const addRestriction = (giver: string, recipient: string) => {
    setRestrictions({
      ...restrictions,
      [giver]: [...(restrictions[giver] || []), recipient],
    });
  };

  const handleDraw = () => {
    try {
      const results = performDraw(participants, restrictions);
      console.log(results);
      sendEmails(results);
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div>
      <h1>SECRET CLAUS</h1>
      <h2>Add Participant</h2>
      <ParticipantForm addParticipant={addParticipant} />
      <ParticipantsList
        participants={participants}
        addRestriction={addRestriction}
        restrictions={restrictions}
      />
      <button onClick={handleDraw}>Realizar Sorteo</button>
    </div>
  );
}

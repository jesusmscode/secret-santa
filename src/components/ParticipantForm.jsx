import React, { useState } from "react";

export  function ParticipantForm({ addParticipant }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();
        addParticipant({ id: Date.now(), name, email });
        setName("");
        setEmail("");
    };

    return (
        <form className={'add'} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Agregar</button>
        </form>
    );
}

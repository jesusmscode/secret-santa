// @ts-ignore
import { useState } from "react";
import Select from "react-select";

export function ParticipantsList({ participants, addRestriction, restrictions }) {
    const [giver, setGiver] = useState(null);
    const [recipient, setRecipient] = useState(null);

    const handleAddRestriction = () => {
        if (giver && recipient) {
            addRestriction(giver.value, recipient.value);
            setGiver(null);
            setRecipient(null);
        }
    };

    const getParticipantNameById = (id, participants) => {
        const participant = participants.find(p => String(p.id) === String(id));
        return participant ? participant.name : id;
    };

    const availableGivers = participants.filter(p => p.id !== parseInt(recipient?.value));
    const availableRecipients = participants.filter(p => p.id !== parseInt(giver?.value));

    const giverOptions = availableGivers.map(p => ({ value: p.id, label: p.name }));
    const recipientOptions = availableRecipients.map(p => ({ value: p.id, label: p.name }));
    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '300px',
        }),
        control: (provided) => ({
            ...provided,
            borderColor: 'green',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'green',
            color: 'white',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'green' : 'white',
            color: state.isSelected ? 'white' : 'black',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'green',
        }),
    };
    return (
        <div>
            <h2>Participants {participants.length}</h2>
            <ul>
                {participants.map((p, idx) => (
                    <li className={'participants'} key={idx}>
                        {p.name} ({p.email})
                        {restrictions[p.id] && (
                            <ul>
                                {restrictions[p.id].map((r, rIdx) => (
                                    <li className={'no-gift'} key={rIdx}>No puede regalar a: {getParticipantNameById(r, participants)}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            {participants.length > 1 && (
                <div className={'add-restriction'}>
                    <h3>Add Restriction</h3>
                    <label>Giver</label>
                    <Select
                        styles={customStyles}
                        className={'select'}
                        value={giver}
                        onChange={setGiver}
                        options={giverOptions}
                        placeholder="Select Giver"
                    />
                    <label>Recipient</label>
                    <Select
                        styles={customStyles}
                        className={'select'}
                        value={recipient}
                        onChange={setRecipient}
                        options={recipientOptions}
                        placeholder="Select Recipient"
                    />
                    <button onClick={handleAddRestriction}>Add Restriction</button>
                </div>
            )}
        </div>
    );
}

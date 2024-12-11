export function performDraw(participants, restrictions) {
    const remaining = [...participants];
    const results = [];

    console.log("restrictions", restrictions);

    for (const giver of participants) {

        const possibleRecipients = remaining.filter(
            recipient => recipient.id !== giver.id && !restrictions[String(giver.id)]?.includes(String(recipient.id)) && !remaining.includes(recipient.id)
        );

        if (possibleRecipients.length === 0) {
            throw new Error("No se puede realizar el sorteo respetando las restricciones.");
        }

        const recipient = possibleRecipients[Math.floor(Math.random() * possibleRecipients.length)];
        console.log("giver:", giver, "recipient:", recipient);
        results.push({ giver: giver, recipient: recipient });
        remaining.splice(remaining.indexOf(recipient), 1);
    }
    return results;
}

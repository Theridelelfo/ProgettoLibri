document.addEventListener('DOMContentLoaded', () => {
    const vecchioTesto = document.getElementById('testo-vecchio');
    const noteAggiornamenti = document.getElementById('note-aggiornamenti');
    const generaButton = document.getElementById('genera-prompt');
    const outputArea = document.getElementById('prompt-output');
    
    // Funzione per generare il testo formattato per l'AI
    function generateAndCopyPrompt() {
        const vecchio = vecchioTesto.innerText.trim();
        const note = noteAggiornamenti.value.trim();
        const capitolo = document.querySelector('.container h2').innerText; // Prende il nome del capitolo

        if (!vecchio && !note) {
            outputArea.value = "ATTENZIONE: Incolla il testo VECCHIO e scrivi le NOTE/DOMANDE prima di generare il prompt.";
            return;
        }

        const prompt = 
`--- INIZIO CONTESTO COACHING ---
TITOLO LEZIONE: ${capitolo}

[TESTO DA AGGIORNARE/ANALIZZARE (Vecchio Corso)]
--------------------------------------------------
${vecchio}
--------------------------------------------------

[NOTE E DOMANDE DI REVISIONE]
-----------------------------
${note}
-----------------------------

[ISTRUZIONI PER IL BOT AI]
Sono l'utente Theridel e sto aggiornando il mio vecchio corso HTML.
Il mio obiettivo è identificare le pratiche obsolete e sostituirle con gli standard moderni (HTML5/CSS3).
Basandoti sulle mie 'Note e Domande', rispondi o esegui l'aggiornamento richiesto, mantenendo uno stile didattico e semplice.
--- FINE CONTESTO COACHING ---
`;
        
        outputArea.value = prompt;

        // Tenta di copiare negli appunti (Funziona solo se la pagina è servita via HTTPS/GitHub Pages)
        navigator.clipboard.writeText(prompt).then(() => {
            generaButton.textContent = '1. Prompt Copiato! (Incolla nel Bot AI)';
            setTimeout(() => {
                generaButton.textContent = '1. Genera e Copia Prompt AI';
            }, 3000);
        }).catch(err => {
            console.error('Errore nella copia: ', err);
            generaButton.textContent = '1. Genera Prompt (Copia Manualmente)';
        });
    }

    generaButton.addEventListener('click', generateAndCopyPrompt);
});

# MeowFocus

**MeowFocus** è un'applicazione ispirata al metodo Pomodoro Timer che consente a gruppi di amici o studenti di connettersi a sessioni di studio condivise. Durante queste sessioni, gli utenti possono studiare insieme in tempo reale e ascoltare musica di sottofondo tramite un'integrazione con un'API di streaming musicale da una radio web senza copyright.

## Tecnologie utilizzate

- **Framework**: React
- **Libreria UI**: TailwindCSS
- **Database**: Firebase
- **API**: Integrazione con una web radio Lo-Fi per fornire musica ambientale durante le sessioni di studio.

## Funzionamento base

L'applicazione si basa su un sistema di sessioni di studio "Pomodoro", in cui un timer permette agli utenti di concentrarsi su un'attività per 25 minuti, seguiti da una breve pausa. Il ciclo si ripete per un numero predeterminato di sessioni.

### Autenticazione

L'autenticazione degli utenti è integrata tramite i servizi di **Firebase**, utilizzando le opzioni di login con **Google** e **email/password**. Ogni utente può creare un account, loggarsi e partecipare a sessioni di studio.

### Creazione delle sessioni

Un utente può creare una sessione di Pomodoro e generare un **codice di invito** che può essere condiviso con altri utenti. Gli utenti che si uniscono alla sessione tramite il codice vedranno lo stesso timer in tempo reale, sincronizzato con gli altri partecipanti.

### Funzionamento del Timer

Il timer del metodo Pomodoro viene gestito principalmente lato client, con pochi check periodici con il server per assicurarsi del corretto funzionamento. Ogni sessione di Pomodoro dura 25 minuti, seguiti da una breve pausa di 5 minuti. Al termine di un ciclo, gli utenti possono iniziare un nuovo ciclo o prendersi una pausa lunga.

### Musica di sottofondo

Durante la sessione di studio, gli utenti possono ascoltare musica Lo-Fi tramite un'integrazione con una radio web senza copyright. Ogni utente ha il controllo sulla propria musica e può gestirla separatamente.

### Statistiche

L'applicazione include una sezione per il tracciamento delle attività, che fornisce statistiche relative al tempo trascorso in sessione, numero di sessioni completate e altre metriche utili, in maniera simile a ciò che offre **Toggl**.

## Funzionalità aggiuntive

- **Gestione delle sessioni**: Ogni utente può creare e gestire le proprie sessioni, invitare amici e partecipare a sessioni di studio collettive.
- **Statistiche personali**: Ogni utente può visualizzare il proprio storico delle sessioni, con informazioni su tempo di studio e tempo di pausa.
- **Musica Lo-Fi**: Ogni partecipante alla sessione può ascoltare musica ambientale Lo-Fi, scelta da una web radio senza copyright, senza interferire con gli altri utenti.

## Come avviare l'applicazione

1. Clona il repository:
git clone https://github.com/tuo-username/meowfocus.git

2. Entra nella cartella del progetto:
cd meowfocus

3. Installa le dipendenze:
npm install

4. Avvia il server di sviluppo:
npm run dev

5. Apri il browser e vai su [http://localhost:3000](http://localhost:3000) per vedere l'app in esecuzione.

## Contributi

I contributi al progetto sono benvenuti! Se desideri contribuire, per favore apri una **pull request** o segnala un **bug** nel repository.

## Licenza

Distribuito sotto la licenza MIT. Vedi `LICENSE` per maggiori dettagli.

## Creato da

- **Francesco Dal Canto** - [FrancescoDalCanto](https://github.com/FrancescoDalCanto)

### Traccia del progetto

[Tech Jobs Fair Roma 2024](https://github.com/tomorrowdevs-projects/tech-jobs-fair-roma-2024-team4/tree/main)

# HABIT TRACKER 👣

## Descrizione del Progetto

**HABIT TRACKER** è un'applicazione web progettata per aiutare gli utenti a tracciare e monitorare le loro abitudini quotidiane, settimanali o mensili. Gli utenti possono definire le loro abitudini personali, ricevere notifiche per ricordare di completarle e visualizzare grafici che mostrano il loro progresso nel tempo.

[Get Started](#get-started)

## Funzionalità Principali

- **Autenticazione utente** 🔐: Gli utenti possono registrarsi e accedere tramite un sistema sicuro di autenticazione basato su Firebase.
- **Definizione delle abitudini** 📋: Gli utenti possono creare nuove abitudini, specificando il nome, la descrizione e la frequenza (giornaliera, settimanale, mensile).
- **Tracciamento delle abitudini** ✅: Gli utenti possono marcare come completata un'attività legata a un'abitudine.
- **Notifiche** 🔔: Notifiche periodiche per ricordare agli utenti di completare le loro abitudini.
- **Report e grafici** 📈: Visualizzazione di grafici che mostrano il progresso delle abitudini nel tempo.
- **Condivisione delle abitudini** 🫶: Possibilità di coinvolgere altri utenti nel tracciamento di un'abitudine comune e inviare loro notifiche via email.

## Tecnologie Utilizzate

- **Frontend**:
  - [React](https://react.dev/) ⚛️
  - [Material UI](https://mui.com/material-ui/) 🎨
  - 
- **Backend, Autenticazione, Databse & Hosting**:
  - [Firebase](https://firebase.google.com/) 💻🔥

- **Grafici**:
  - [Chart.js](https://www.chartjs.org/) 📈 📉

## Funzionalità Principali

- **Autenticazione utente** 🔐: Gli utenti possono registrarsi e accedere tramite un sistema sicuro di autenticazione basato su Firebase.
- **Definizione delle abitudini** 📋: Gli utenti possono creare nuove abitudini, specificando il nome, la descrizione e la frequenza (giornaliera, settimanale, mensile).
- **Tracciamento delle abitudini** ✅: Gli utenti possono marcare come completata un'attività legata a un'abitudine.
- **Notifiche** 🔔: Notifiche periodiche per ricordare agli utenti di completare le loro abitudini.
- **Report e grafici** 📈: Visualizzazione di grafici che mostrano il progresso delle abitudini nel tempo.
- **Condivisione delle abitudini** 🫶: Possibilità di coinvolgere altri utenti nel tracciamento di un'abitudine comune e inviare loro notifiche via email.

## Requisiti

- Node.js >= 20.17
- Firebase Account
- Git

## Get Started

Installare Node.js
https://nodejs.org/en

Installare git
https://git-scm.com/downloads

Clonare il progetto con il comando nella bash o nel vostro terminale
```sh
git clone git@github.com:tomorrowdevs-projects/tech-jobs-fair-roma-2024-team4.git
```

Spostarsi nella cartella habit tracker
```sh
cd habit_tracker
```

Aggiungere un file .env con i parametri [firebase](https://firebase.google.com/_d/signin?continue=https%3A%2F%2Ffirebase.google.com%2F&prompt=select_account)
```
VITE_FIREBASE_API_KEY=<YOUR API KEY>
VITE_FIREBASE_AUTH_DOMAIN=<YOUR VALUE>
VITE_FIREBASE_PROJECT_ID=<YOUR VALUE>
VITE_FIREBASE_STORAGE_BUCKET=<YOUR VALUE>
VITE_FIREBASE_MESSAGING_SENDER_ID=<YOUR VALUE>
VITE_FIREBASE_APP_ID=<YOUR VALUE>
```
![firebase parameter](/documentation/image/firebase-parameter.png  "firebase parameter")

Installare le dipendenze
```sh
npm i
```

Lanciare la web app con il comando
Installare le dipendenze
```sh
npm run dev
```

[Go to Top](#top)
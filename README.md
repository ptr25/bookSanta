# Book Santa 

*Because every book deserves another reader*

One of my early React Native projects, built around a simple idea.... **what if the books sitting unread on our shelves could find their way to someone who really wanted them?**

Book Santa was my attempt at creating a platform where people could request books they wanted to read, and others could volunteer to donate them.

I loved the idea of using something I was just learning — programming — to make sharing knowledge a little easier.

##  What Does It Do?

Book Santa is a book-sharing and donation app prototype that connects readers with potential donors.

-  **Request Books:** Users can request a book and explain why they'd like to read it.
-  **Donate Books:** Browse requests from other readers and offer to donate a book.
-  **Login & Signup:** Create an account using Firebase Authentication.
-  **Notifications:** Receive updates when someone expresses interest in donating.
-  **Track Donations:** Manage donation requests and update their status from *Donor Interested* to *Book Sent*.
-  **Profile Management:** Update personal details such as name, contact information, and address.

##  Built With Love and 

| Technology | What I Used It For |
|---|---|
| **JavaScript** | Application logic and handling user interactions |
| **React Native** | Building the mobile interface |
| **Expo** | Developing and testing the application |
| **Firebase Authentication** | User registration and login |
| **Cloud Firestore** | Storing book requests, users, donations, and notifications |
| **React Navigation** | Switching between screens, tabs, and menus |
| **Lottie** | Adding an animated welcome-screen illustration |
| **React Native Elements** | Reusable interface components |
| **SwipeListView** | Swipeable notifications |

## How It Works

The idea was to create a complete little book-sharing workflow:

1. **Sign up or log in** using an email address and password.
2. **Request a book** by entering its name and why you need it.
3. Book requests are stored in **Firebase Cloud Firestore**.
4. Other users can browse the requests and offer to donate.
5. The app records the donor's interest and creates a notification for the requester.
6. Donors can track their contributions and mark books as sent.

The app uses Firestore's real-time listeners, so changes to book requests and notifications can appear without manually refreshing the data.

##  What I Learnt

This was one of the projects where I started understanding how the different pieces of an actual application come together.

- **React Components, Props & State:** Building reusable screens, passing information between components, and using `this.state` and `this.setState()` to manage changing data.
- **Firebase Authentication:** Understanding how users register, log in, and maintain accounts.
- **Cloud Firestore:** Moving beyond temporary React state to storing and retrieving information from a real database.
- **CRUD Operations:** Creating book requests, reading data, updating donation statuses, and learning how database records are managed.
- **Real-Time Data:** Using Firestore's `onSnapshot()` listeners to respond to changes.
- **React Navigation:** Experimenting with stack navigators, bottom tabs, and a side drawer to organize multiple screens.
- **Asynchronous JavaScript:** Working with promises, `.then()`, and data that isn't immediately available.
- **Notifications & Gestures:** Exploring notification updates and swipe interactions.
- **App Architecture:** Organizing the project into separate `screens`, `components`, and configuration files.

Before this, most of my projects were fairly small and self-contained. Here, I was starting to understand how users, databases, different screens, and application logic could all work together.

## Running the Project

This project was originally built using **Expo SDK 39 and React Native**.

To explore the code, clone the repository:

```bash
git clone https://github.com/ptr25/bookSanta.git
cd bookSanta
```

The original project uses older versions of Expo, Firebase, and React Navigation, so it may require dependency upgrades and some code fixes before running on current devices.

The Firebase configuration also needs to point to a properly configured project with appropriate authentication settings and Firestore security rules.

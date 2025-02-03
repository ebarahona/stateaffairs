# SUMMARY:

I've gained valuable insights from building applications that scale. To prioritize code sustainability it is crucial to consider the changes over time, so we can address scale and growth as the application evolves.

- Code Sustainability
  - Eng time and change
    - How code will need to adapt over time
- Biz needs: Scale and growth
  - How the organization will need to adapt as it evolves
- Trade-offs and costs
  - Make decisions based on time, scale and growth, taking into account business needs, and resources
    - The code base needs to react to change, both in tech or business needs
  - What is the expected lifetime of the code?
    - Libraries, OS, external APIs, resources
    - Maintenance, size of team, future growth

## APPROACH

Due to the time constraint this project focuses on the mobile app architecture and not the UI/UX, there is a lot of room for improvement.

    - Because the instructions have a distance property I inferred that this is a running/walking app
    - Did not take into account other types of workouts, e.g. reps, weight, etc…

- Code Scalability:
  - Named components instead of default exports
    - Default exports can lead to inconsistencies when multiple engineers are working on the same codebase and using different import names.
  - Abstracted navigators for scalability and readability
    - Did not use expo router (file router)
  - Components are very simple and encapsulated, the more complex apps could have individual component files in the component folder: MyComponent/ index.ts, view.tsx, styles.ts, interface.d.ts
    - The same applies to screens
- Mock services:
  - The requirements called for persistance, I opted to create mock service to fetch data from the client store (async storage)
  - Would have used MMKV but Expo go does not supported, in a real-world enviroment I would have opted for MMKV
    - Mock api service calls local storage rather than rest/graphql to pre-populate data if it exists
    - In production apps we would do both, use a service to call an API service and also check local storage for certain settings
    - Depending on the production app the client data store is taken into consideration,
    - If local storage (async storage) I would use MMKV as it's more peformant, React-native-mmkv is not supported by expo go, only in dev builds or ejected (non expo) apps, MMKV is more performant than AsyncStorage
    - For more heavy data store needs I wouLD use an actual database such as RealmDB or SQLite (local storage uses SQLite under the hood)
- FlashList is not really needed for this exercise, but in a real-world application this functionality would need to be performant, so Flashiest was used rather than Flatlist

- Reusable input validator
  - React-hook-form (Used it for the sake of development time, but use of libraries can add bloat to the mobile application)
    - https://react-hook-form.com/
- Expo Router (file based routing)
  - Opted for react-navigation instead of simple file based expo-routing, I find react naviation to be more flexible, the benefit of expo router is deep-linking but deep-linking is something I'm very familiar with and can implement fairly easily

## TODOS:

        - Tests: Meaningful unit and UI tests using jest
        - Error handling
        - Use animated skeleton (shimmer) or static UI skeleton components for component fallback
        - Use Suspense with skeleton components
        - Add responsive theming: typography, base padding, margin, etc...
        - haptic feedback on buttons
        - Add modals to verify deletion
        - Gracefully handle date picker animations
        - Statistics screen
            - Would have implemented custom charts using SKIA
                - React-native-skia
            - Cool metrics Average speed, fastest speed, calories burned, etc…

        - All strings should be parameterized, using I18n
          - Handle localization
              - https://github.com/zoontek/react-native-localize
              - https://github.com/fnando/i18n-js
        - Splah screen before app loads
        - Lots of UI improvements
            - Add responsive sizing, fonts and margins based on screen dimensions
            - Theming
                - Typography: use a package such as typography to manage typography
                - UI Libs: Would have explored UI libraries and frameworks such as RNULIB, RN Elements, Paper, etc…
                - Tailwind CSS, explore styling options
            - Animations
                - Explorer animations for a better user experience (moti)

## COOL THOUGHTS

- Use AI to tailor workouts specific to user health profile
- Add start stop, to automatically track the walking workout and capture geo location data to playback the walk/workout along with other values such as elevation etc…

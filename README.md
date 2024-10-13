# Project Name : Purrfect Care

## Live website link : https://purrfect-care-client.vercel.app/

### Server github link : https://github.com/Rahat73/Purrfect-Care-Server

## Introduction

**_Purrfect Care_** : _Purrfect Care is your trusted companion for expert pet care tips, heartwarming stories, and personalized guidance to ensure a happy and healthy life for your pets..._

## Project Description

Purrfect Care is a comprehensive platform designed to provide expert tips, engaging stories, and essential resources for pet owners, helping them ensure the well-being of their pets. Our website offers a range of features like allowing users to create posts, comment on stories, upvote and downvote content, follow each other, access premium materials, and personalized pet nutrition calculators based on their species, age, and weight . With a user-friendly interface, a dynamic dark/light mode, and secure authentication and profile management, Purrfect Care is the ultimate companion for every pet lover looking to provide the best care possible.

## Features

1. **User Authentication & Management:**

   - User registration and login functionality.
   - Role-based access control (e.g., admin and regular users).
   - Admin can manage users, including promoting users to admin and blocking accounts and unpublishing posts.

2. **Post Creation and Management:**

   - Users can create and manage posts, categorizing them as either "Tips" or "Stories" to provide focused content.
   - Posts can be marked as premium, granting exclusive access to users who have subscribed or made payments.
   - Users can upload images to enhance their posts, making the content more engaging and visually appealing.

3. **Post Interations:**

   - Users can express their opinions on posts by upvoting or downvoting, helping to surface the most valuable content.
   - Users can engage in discussions by leaving comments on posts with the ability to edit and delete them.
   - Users can follow authors to stay updated on new content and activity related to posts they are interested in.

4. **Profile Management:**

   - Users can view and edit their personal details such as name, email, and profile picture.
   - Users can view and manage posts they’ve created, including editing or deleting posts directly from their profile.

5. **Password Management:**

   - Users can easily change their password from their profile settings, enhancing account security with minimal effort.
   - Users can reset their passwords through a secure process that involves email verification to ensure account safety.

6. **Coupon and Discount System:**

   - A spinning wheel game that users can play to win discount codes.
   - Coupons management system for admins to create, update, and delete coupons.
   - Functionality to apply coupons at checkout, reducing the total rental cost.

7. **Searching, Filtering, and Sorting:**

   - Users can quickly find posts, comments, or users by typing keywords into a search bar, with results updating in real-time.
   - Users can filter posts by category, upvote, downvote.

8. **Admin Dashboard:**

   - Admin can publish / unpublish posts.
   - Make users admin and block users.
   - Monitor payment histories.

9. **Nutriotion Calculator:**

   - A personalized pet nutrition calculator based on their species, age, and weight.

10. **Promotions and Special Offers:**

    - A section for displaying active promotions and discounts.
    - Clear instructions on how to apply promotional codes at checkout.

11. **Dark/Light Mode:**

    - Theme switching functionality allowing users to toggle between dark and light modes.

12. **Error Handling and Notifications:**
    - Real-time notifications and error handling for a better user experience.
    - Toast notifications to inform users of successful actions or errors during processes like booking, payment, or coupon application.

## Technology Stack

- Frontend: React, Next.js, Next UI, Tailwind, Tanstack Query, Axios, React-hook-form, ZOD, Cloudinary etc.
- Backend: Node JS, Express JS, Mongoose, ZOD, AmarPay, Node Mailer etc.

## Installation Guideline

### Prerequisites

- node, npm must be installed before running the project

### Configure frontend

- Clone the git repository
- Go to the file directory
- Create an .env file and add the following variables

```
NEXT_PUBLIC_BASE_API --> put the base url of your local server
```

- Run Command `yarn install` to install required modules
- Run command `yarn run dev` to start the server

### Configure server

- Clone the git repository
- Go to the file directory
- Create an .env file and add the following variables

```
NODE_ENV --> development
PORT --> Port of your local server
DATABASE_URL --> Mongodb connection string
BCRYPT_SALT_ROUNDS --> Number of rounds for hashing
JWT_ACCESS_SECRET --> JWT access token secret
JWT_ACCESS_EXPIRES_IN --> JWT access token expiration time
STORE_ID --> AmarPay store id
SIGNATURE_KEY --> AmarPay signature key
PAYMENT_URL --> AmarPay payment url
PAYMENT_VERIFICATION_URL --> AmarPay payment verification url
RESET_PASS_UI_LINK --> local_host_client_url/forgot-password
GOOGLE_ACC --> Google account
GOOGLE_APP_PASS --> Google app password
```

- Run Command `npm install` to install required modules
- Run command `npm run start:dev` to start the server

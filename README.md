This project was developed as part of the requirements of my degree (B.C.A) during the Training Period in CyberSecurity.

It mainly has three features:

1) Password Strength Checker:
It checks whether the password is strong or not based on conditions like length, uppercase, lowercase, numbers, and special characters. 
Also, the password should not contain personal information like name.

2) Password Generator:
It is an add-on feature within this project to generate strong passwords.

3) Brute Force Simulation:
This feature was added to show why strong passwords are necessary by demonstrating how passwords can be cracked by repeatedly trying different combinations. It is just a simulation, not a real brute force attack. In this, First You will see a Sign Up page(In this you can try making different accounts with weak or strong passwords yourself to compare how weak passwords are easily crackable.) Then you can go on Login page(Assume you forget the password and try the brute force button). In bruteForce page enter or choose Username from database and see the Simulation.

#How to Run This Project -

1. Clone the repository

git clone https://github.com/cyberharjot/My-First-Project-Password-Strength-Checker-.git

2. Go into the project folder

cd My-First-Project-Password-Strength-Checker-

3. Install dependencies

npm install

4. Start the server

node server.js

5. Open in browser

http://localhost:3000

Note - Project may not look properly responsive. it was meant for Desktop or Laptops. but will work fine

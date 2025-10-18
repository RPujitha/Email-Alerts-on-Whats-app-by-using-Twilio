# Email-Alerts-on-Whats-app-by-using-Twilio
Understanding Google Apps Script files

Google Apps Script code is written in JavaScript, but stored on Google’s servers.
When you export or copy it to your local system, it’s just plain JavaScript files — so the extension is:

✅ .gs

Example:

sendAlerts.gs
main.gs
config.gs


You can also include .html files if you used custom web interfaces (for example, sidebar or dialog boxes):

index.html
sidebar.html

⚙️ 2️⃣ How to export your Google Apps Script code

There are 3 common ways:

Option 1 – Copy manually

Open your Apps Script project (in script.google.com).

Open each file and copy its contents.

On your local computer, create the same file name, e.g., Code.gs.

Paste the content inside.

Option 2 – Use Google’s clasp tool (recommended)

If you want version control or plan to update the script later, use CLASP (Command Line Apps Script):

npm install -g @google/clasp
clasp login
clasp clone <your-script-id>


This downloads all your .gs and .html files into a folder — perfect for GitHub.

💾 3️⃣ Uploading to GitHub

Once your .gs files are ready:

Create a new folder (for example, email-alerts-whatsapp).

Add your files:

Code.gs
WhatsAppAPI.gs
appsscript.json


Initialize Git:

git init
git add .
git commit -m "Initial commit - WhatsApp Email Alerts project"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main

📄 4️⃣ Optional files you can include

README.md → Describe what your script does and how to use it

appsscript.json → Script metadata (auto-included by clasp)

.gitignore → To ignore unnecessary files

Example structure:

email-alerts-whatsapp/
│
├── Code.gs
├── WhatsAppAPI.gs
├── appsscript.json
└── README.md

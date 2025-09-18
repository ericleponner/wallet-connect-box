# wallect-connect-box

1) `git clone https://https://github.com/ericleponner/wallect-connect-box`
2) `cd wallect-connect-box`
3) `npm install`
4) Edit `src/tools.ts` and sets `PROJECT_ID` with your Wallet Connect project ID
5) `npm start`
6) Open http://localhost:5173 (and ignore security warning if any)
7) Click `Connect to Wallet Connect`
8) Scan QR-code with `HashPack` or `Blade wallet`<br>
=> connection should be established and `SESSION` section should appear
9) Client `Disconnect from Wallet Connect`<br>
=> disconnection should happen and `SESSION` section should disappear

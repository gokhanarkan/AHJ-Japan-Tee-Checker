# Instructions on how to update the Node Version to 14 on Replit. (Replit uses v12, though I needed v14 to run my tests.)

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install --lts
nvm use --lts

tput setaf 6;
printf "\n\n"
printf "If running node/nvm doesn't work, run:\n\n"
tput setaf 2;
printf 'export NVM_DIR="$HOME/.nvm" &&\n'
printf '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" &&\n'
printf '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" &&\n'
printf '\nnvm install --lts &&\nnvm use --lts\n'
tput setaf 6;
printf '\nOr, just copy and paste the commands inside the script.\n'
tput init
: 
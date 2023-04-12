import server$ from 'solid-start/server';
import { execSync } from 'child_process';

const NODE = 'ALGORAND_NODE';
const DATA = 'ALGORAND_DATA';

type Error = {
  error: {
    gotError: boolean,
    type: string,
    status: number,
    msg: string,
    stderr: string
  }
}

type Checks = {
  allPassed: boolean,
  nodePath: boolean,
  dataPath: boolean,
  algodRunning: boolean,
  error: Array<Error>;
}

const terminalCalls = {
  initChecks,
  getNet,
  getToken,
}

export default terminalCalls;

// Remove all line breaks from terminal calls
const removeLineBreaks = (str: string) => {
  return str.replace(/(\r\n|\n|\r)/gm, "");
}

async function initChecks() {
  const serverCall = server$(async  () => {
    const initCheck: Checks = {
      allPassed: false,
      nodePath: false,
      dataPath: false,
      algodRunning: false,
      error: []
    }
    // Check the 2 paths required
    const runPathChecks = (type: string, path: string) => {
      try {
        // Check if the user has set the $ALGORAND_NODE path
        const results = execSync(`if [ -z "\${${type}}" ]; then echo 0; else echo 1; fi;`);
        initCheck[path] = Boolean(Number(results.toString().replace(/(\r\n|\n|\r)/gm, "")));
      } catch (err: any) {
        const errorData: Error = {
          error: {
            gotError: true,
            type: type,
            status: err.status,
            msg: err.message,
            stderr: err.stderr
          }
        }
        initCheck.error.push(errorData);
      };
    };

    const checkAlgod = () => {
      try {
        // Check if the user has set the $ALGORAND_NODE path
        const results = execSync(`cat $ALGORAND_DATA/algod.net > /dev/null && echo 1 || echo 0`);
        initCheck.algodRunning = Boolean(Number(results.toString().replace(/(\r\n|\n|\r)/gm, "")));
        if (!initCheck.algodRunning) {
          throw {
            status: -1,
            message: 'Algod is not running!',
            stderr: '',
          }
        }
      } catch (err: any) {
        const errorData = {
          error: {
            gotError: true,
            type: "ALGOD",
            status: err.status,
            msg: err.message,
            stderr: err.stderr,
          }
        }
        initCheck.error.push(errorData);
      };
    };

    runPathChecks(NODE, 'nodePath');
    runPathChecks(DATA, 'dataPath');
    checkAlgod();
    if (initCheck.error.length === 0) {
      initCheck.allPassed = true;
    }
    return initCheck;
  })
  return await serverCall();
}

const commandCall = (type: string) => {
  try {
    const result = execSync(`${type}`);
    return {
      error: false,
      msg: removeLineBreaks(result.toString())
    }
  } catch (err: any) {
    return {
      error: true,
      msg: removeLineBreaks(err?.message.toString())
    }
  }
}

async function getNet() {
  const serverCall = server$(async  () => {
    return commandCall(`cat $${DATA}/algod.net`)
  })
  return await serverCall();
}

async function getToken() {
  const serverCall = server$(async  () => {
    return commandCall(`cat $${DATA}/algod.token`);
  })
  return await serverCall();
}

async function getStatus() {
  const serverCall = server$(async  () => {
    return commandCall(`$${NODE}/goal node status -d ${DATA}`);
  })
  return await serverCall();
}

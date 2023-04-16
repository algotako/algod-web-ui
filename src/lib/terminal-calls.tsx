import server$ from 'solid-start/server';
import { execSync, exec } from 'child_process';

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
      msg: result.toString()
    }
  } catch (err: any) {
    return {
      error: true,
      msg: err?.message.toString()
    }
  }
}

async function getNet() {
  const serverCall = server$(async  () => {
    const resp = commandCall(`cat $${DATA}/algod.net`)
    resp.msg = removeLineBreaks(resp.msg);
    return resp;
  })
  return await serverCall();
}

async function getToken() {
  const serverCall = server$(async  () => {
    const resp = commandCall(`cat $${DATA}/algod.net`)
    resp.msg = removeLineBreaks(resp.msg);
    return resp;
  })
  return await serverCall();
}

async function getStatus() {
  const serverCall = server$(async  () => {
    const resp = commandCall(`$${NODE}/goal node status -d $${DATA}`);
    
    // convert the status msg into an OBJ
    const obj: { [key: string]: string } = {};
    resp.msg = resp.msg.split(/\r\n|\r|\n/);
    
    // remove an extra line break if it exists
    if (resp.msg[resp.msg.length - 1] === '') resp.msg.pop();
    resp.msg.forEach((m: string) => {
      const line = m.split(': ');
      obj[line[0]] = line[1];
    });
    resp.msg = obj;
    return resp;
  })
  return await serverCall();
}

async function getProposals() {
  const serverCall = server$(async  () => {
    const resp = commandCall(`echo $(grep -c 'ProposalBroadcast' $${DATA}/node.log)`);
    resp.msg = removeLineBreaks(resp.msg);
    return resp
  });
  return await serverCall();
}

async function getVotes() {
  const serverCall = server$(async  () => {
    const resp = commandCall(`echo $(grep -c 'VoteBroadcast' $${DATA}/node.log)`);
    resp.msg = removeLineBreaks(resp.msg);
    return resp
  });
  return await serverCall();
}

async function getFrozen() {
  const serverCall = server$(async  () => {
    const resp = commandCall(`echo $(grep -c 'froze' $${DATA}/node.log)`);
    resp.msg = removeLineBreaks(resp.msg);
    return resp
  });
  return await serverCall();
}

// async calls
// const asyncCall = async (type: string) => {
//   const resp = exec(`${type}`, (err: any, stdout: any, sterr: any) => {
//     debugger;
//     if (err) {
//       return {
//         error: true,
//         msg: 'Something went wrong',
//       }
//     }
//     return {
//       error: false,
//       msg: stdout.toString()
//     }
//   });
//   debugger;
// };

async function getMemUsed() {
  const serverCall = server$(async  () => {
    const usedMem = commandCall(`echo $(($(free | grep Mem: | awk '{print $2}') - $(free | grep Mem: | awk '{print $7}')))`);
    const totalMem = commandCall(`echo $(free | grep Mem: | awk '{print $2}')`);
    if (usedMem.error || totalMem.error) {
      // There were some errors
    } else {
      const percentage = (Number(removeLineBreaks(usedMem.msg)) * 100) / Number(removeLineBreaks(totalMem.msg));
      return percentage.toFixed(1);
    }
  });
  return await serverCall();
}

async function getDiskUsed() {
  const serverCall = server$(async  () => {
    const diskUsed = commandCall(`df -T | awk '{if($7 == "/") print $6}' | sed 's/%//g'`);
    if (diskUsed.error) {
      // There were some errors
    } else {
      return removeLineBreaks(diskUsed.msg);
    }
  });
  return await serverCall();
}

// Special function used to generate a time stamp to query the logs
const generateDates = (date: Date) => {
  const timeStamps = [];
  const month = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}`;
  for (let i = 0; i < 6; i++) {
    let hourOffset = date.getHours() - i;
    let dateOffset = date.getDate();
    // If we need to check times before midnight we need to adjust the date
    if (hourOffset < 0) {
      hourOffset = 24 + hourOffset;
      dateOffset -= 1;
    }
    timeStamps.push(`${date.getFullYear()}-${month}-${dateOffset}T${hourOffset}`);
  }
  return timeStamps;
}

// Will get and return an array of votes for the last 6 hours
async function getHourlyVotes() {
  const serverCall = server$(async () => {
    const voteTime = {
      timeStamps: generateDates(new Date()).reverse(),
      votes: new Array()
    }
    voteTime.timeStamps.forEach((timeStamp, i) => {
      const resp = commandCall(`echo $(grep -cE 'VoteBroadcast.*${timeStamp}' $ALGORAND_DATA/node.log)`);
      const votes = Number(removeLineBreaks(resp.msg));
      voteTime.votes.push(votes);
      // Adjust dates to show time in HH:MM format
      voteTime.timeStamps[i] = `${timeStamp.slice(-2).replace('T', '0')}:00`;
    });
    return voteTime;
  });
  return await serverCall();
}

const terminalCalls = {
  initChecks,
  getNet,
  getToken,
  getStatus,
  getProposals,
  getVotes,
  getFrozen,
  getMemUsed,
  getDiskUsed,
  getHourlyVotes
}

export default terminalCalls;

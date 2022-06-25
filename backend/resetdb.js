const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function runReset() {
  const { stdout, stderr } = await exec("npm run resetdb");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}

module.exports = resetDb = async () => {
  await runReset();
};

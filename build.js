const {execSync} = require("child_process");
const fs = require("fs-extra");
const path = require('path');

const distPath = path.resolve("map-sioca");
const buildPath = path.resolve("build");
const staticFilesPath = path.resolve(distPath + "/static");

installNodeModules();
buildApplication();
renameFilesAndDir();

function installNodeModules () {
    console.log("Iniciando a instalação dos módulos node.");

    if (!fs.existsSync("node_modules")) execSync("npm i");

    console.log("Os módulos node da aplicação já estão instalados.");
}

function buildApplication () {
    console.log("Iniciando o Build da aplicação.");

    if (fs.existsSync("build")) fs.removeSync(buildPath);
    if (fs.existsSync("map-sioca")) fs.removeSync(distPath);

    execSync("npm run build");

    console.log("Build da aplicação concluído com sucesso.");
}

function renameFilesAndDir () {

    renameDir();
    removeUnusedFiles();
    removeSourceMapsAndRenameFiles();

    console.log("Aplicação 'map-sioca' instalada com sucesso.");

    function renameDir () {
        fs.renameSync(buildPath, distPath);
        console.log("Diretório 'map-sioca' criado com sucesso.")
    }

    function removeUnusedFiles () {
        let files = fs.readdirSync(distPath);

        for (const file of files) {
            let joinedPath = path.join(distPath, file);
            let stats = fs.statSync(joinedPath);

            if (!stats.isDirectory()) {
                fs.unlinkSync(path.resolve(joinedPath));
            }
        }
    }

    function removeSourceMapsAndRenameFiles () {
        let dirs = ["/css", "/js"];

        dirs.forEach((dir) => {
            let filePath = path.resolve(staticFilesPath + dir);
            let files = fs.readdirSync(filePath);

            for (let file of files) {
                if (/\.map$/.test(file)) {

                    fs.unlinkSync(path.resolve(filePath, file));
                } else {

                    let extension =  /main.\w+(\.\w+)/.exec(file)[1];

                    let newFile = path.resolve(filePath + "/main" + extension);
                    let oldFile = path.resolve(filePath + "/" + file);

                    fs.renameSync(oldFile, newFile);
                }
            }
        });
    }
}

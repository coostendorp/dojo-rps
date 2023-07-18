# Installation

This section discusses how to install the Dojo Web Starter, a Dojo Hackathon Primer Kit. The author
recommends using Visual Studio Code to work with Cairo. As of now, Cairo support is limited to the
aforementioned IDE. As per [this discussion](https://youtrack.jetbrains.com/issue/IDEA-294687/Add-support-for-.cairo-file-type#focus=Comments-27-6103135.0-0),
IntelliJ has no plans to support Cairo.

## Prerequisites
- Install [Rust](https://www.rust-lang.org/tools/install)
- Install [Visual Studio Code](https://code.visualstudio.com/download)
- Install [Scarb Package Manager](https://docs.swmansion.com/scarb)
- Follow [the instructions](https://book.dojoengine.org/development/setup.html#3-setup-cairo-vscode-extension) here to set up the Cairo VSCode Extension 

## Step-by-Step Guide

Follow the steps below to set up and run an Autonomous World.

### Step 1: Install `dojoup`

Start by installing `dojoup`. This cli tool is a critical component when building with Dojo. It manages dependencies and helps in building your project. Run the following command in your terminal:

```console
curl -L https://install.dojoengine.org | bash
dojoup
```

The command downloads the `dojoup` installation script and executes it.

### Step 2: Clone the Repository

The next step is to clone the repository to your local machine. Open your terminal and type the following command:

```console
git clone https://github.com/coostendorp/dojo-web-starter && cd dojo-web-starter
```

This command will create a local copy of the Dojo Web Starter repository and enter the project directory.


### Step 3: Build the Example World

With `dojoup` installed, you can now build your example world using the following command:

```console
make build
```

This command compiles your project and prepares it for execution.

### Step 4: Start Katana RPC

[Katana RPC](https://book.dojoengine.org/framework/katana/overview.html) is the communication layer for your Dojo World. It allows different components of your world to communicate with each other. To start Katana RPC, use the following command:

```console
katana --allow-zero-max-fee
```

### Step 5: Migrate (Deploy) the World

Finally, deploy your world using the `sozo migrate` command. This command, deploys your world to Katana!

```console
make deploy
```

### Step 6: Get the React frontend ready

```console
make prep_web
cd web
yarn
```


### Step 7: Run the frontend locally

```console
cd web
yarn dev
```
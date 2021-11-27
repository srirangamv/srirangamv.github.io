---
layout: post
title: "Installing .Net SDK on linux"
name: "2021-11-27-install-and-use-dotnet-on-linux"
description: "How to install and use .NET SDK on linux. Simple steps for installing and using .NET SDK on linux manually."
keywords: "c#,.net,.net core,.net sdk,dotnet CLI,installation,linux,bash,technical article,blog,post"
date: 2021-11-27
---

How to install dotnet SDK on Linux manually?

choose your SDK from below published links.

<https://dotnetcli.azureedge.net/dotnet/Sdk/3.1.413/dotnet-sdk-3.1.413-linux-x64.tar.gz></br>
<https://dotnetcli.azureedge.net/dotnet/Sdk/5.0.302/dotnet-sdk-5.0.302-linux-x64.tar.gz></br>
<https://dotnetcli.azureedge.net/dotnet/Sdk/5.0.401/dotnet-sdk-5.0.401-linux-x64.tar.gz></br>
<https://dotnetcli.azureedge.net/dotnet/Sdk/6.0.100/dotnet-sdk-6.0.100-linux-x64.tar.gz></br>


## Step 1

``` bash
cd $HOME/downloads
wget https://dotnetcli.azureedge.net/dotnet/Sdk/6.0.100/dotnet-sdk-6.0.100-linux-x64.tar.gz #download
DOTNET_FILE=$(pwd)/dotnet-sdk-5.0.401-linux-x64.tar.gz
export DOTNET_ROOT=$HOME/dotnet
mkdir -p "$DOTNET_ROOT" #this will be the home for .NET SDK.
tar zxf "$DOTNET_FILE" -C "$DOTNET_ROOT" #extract downloaded file to your dotnet root folder
export PATH=$PATH:$DOTNET_ROOT #optional. for the same session only.
```

## Step 2

open ***~/.bashrc*** in any editor and add the below lines at the end ot it. You can open this file in VS Code using ***"code ~/.bashrc"***.
``` bash
export DOTNET_ROOT=$HOME/dotnet #i've extracted SDK to '~/dotnet'
export PATH=$PATH:$DOTNET_ROOT #add dotnet cli location to the path.
```
## Step 3

Activate new settings using below command.
``` bash
source ~/.bashrc
```
## (OR)

Simply extract the tar zip to any folder and create link file to the extracted folder in ***"/usr/share/bin"***.

``` bash
sudo ln -s <<path to your extracted folder>>/dotnet /usr/share/bin
```
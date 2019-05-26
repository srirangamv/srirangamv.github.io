---
layout: post
title: "Running A Flask App inside a Docker container"
name: "2019-05-26-running-flask-inside-container"
description: "2019-05-26-running-flask-inside-container"
date: 2019-05-26
---

<h3><a name="section1">Docker Introduction</a></h3>
<p>According to the Wikipedia, Docker is a collection of interoperating software-as-a-service and platform-as-a-service offerings that employ operating-system-level virtualization to cultivate development and delivery of software inside standardized software packages called containers.</p>

<p>
It is a container platform that enables developers, enterprises build, share, run code seamlessly anywhere.
</p>
<h3><a name="section2">Why Docker?</a></h3>
<ul>
  <li>Light: e.g., A physical machine running 10 Docker container means, all the 10 containers shares a single kernel. whereas a physical machine running 5 VMs will have 5 different Operating Systems.</li>
  <li>Sharing: Anyone can download/pull publicly available images and start running the containers.</li>
  <li>Distribution:Anyone can create an image and publish to Docker Registry.</li>
  <li>Scale: Docker container are easily scalable.</li>
</ul>
<h3><a name="section3">Docker Terminology</a></h3>
<p>
<b>Image</b>: A Docker Image is unit/package of code created and a specification file (usually a text file named Dockerfile) which lists runtime, tools, libraries and settings required to run the code creted.
<br>
<b>Container</b>: A Docker container is a lightweight, isolated, executable package of software that includes everything needed to run an application: code, runtime, tools, libraries and settings essentially a Docker Image. Docker image is a static entity and when Docker engine runs that image, it become a container.
 which lists runtime, tools, libraries and settings required to run the code creted.
<br>
<b>Registry</b>: A Docker registry is a repository for Docker images. Docker clients connect to registries to download ("pull") images for use or upload ("push") images that they have built. Registries can be public or private. Two main public registries are Docker Hub and Docker Cloud. Docker Hub is the default registry where Docker looks for images.
<br>
<b>dockerd</b>: This is a daemon process that manages containers and listens to Docker client requests sent using Docker Engine API.
 which lists runtime, tools, libraries and settings required to run the code creted.
<br>
<b>docker</b>: This is a docker client provides CLI for issueing requests to Docker daemon.
<br>
<b>Docker Compose</b>: Docker compose is a tool for defining and running multi-container Docker applications specified using YAML file. The docker-compose.yml file is used to define an application's services and includes various configuration options for the same. docker-compose CLI utility allows users to run commands on multiple containers at once, e.g., building images, scaling containers, running containers that were stopped, and more.
 which lists runtime, tools, libraries and settings required to run the code creted.
<br>
<b>Docker Swarm</b>: Swarming provides native clustering functionality for Docker containers, which turns a group of Docker engines into a single virtual Docker engine.
</p>
<h3><a name="section4">Installing Docker</a></h3>
<p>Docker CE(Community Edition) can be installed from <a href="https://docs.docker.com/install/" alt="Docker CE download link" target="_blank">here</a>. Docker CE consists of Docker Engine and client. Below are some <span>Docker helpful commands</span>
<p>

Listing all images:
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker image ls</p>
<b>Output:</b>
<p class="cmd">
REPOSITORY        TAG               IMAGE ID             CREATED             SIZE
<br>
<br>
</p>
Listing all containers:
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker container ls</p>
<b>Output:</b>
<p class="cmd">
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                  NAMES
<br>
<br>
</p>

<h3><a name="section5">Running Python inside a container</a></h3>
Please run the below command.
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker run --rm -it python:3 python</p>
<p>You will see pyhton interpreter running from inside a Docker container. You can issue any python statements. type exit() to close the container.
Above command do the following things.
<ul>
  <li>Checks if python:3 image already downloaded and available.</li>
  <li>If not, downloads it from public registry.</li>
  <li>Creates, a new container with python:3 image.</li>
  <li>Runs pyhton program inside the container in interactive mode using terminal specified by --it switch.</li>
  <li>Once interpreter closed via exit(), removes the container specified by --rm switch.</li>
</ul>	
</p>

<h3><a name="section6">Running our first Python program inside a container</a></h3>
<p>Let's create a simple python program. <br>Create application folder <b>FirstApp</b>.<br>create new folder <b>src</b> inside FirstApp folder.<br>create app.py inside <b>FirstApp\src</b> folder.
<br>Add the following code to app.py.
</p>

{% highlight python %}
# file: app.py

print('Hello World!')

{% endhighlight %}

<p>
    Your code should look like below.
    <figure>
      <img src="/images/firstapp_code.png" alt="code screenshot" width="50%" height="50%" />
      <figcaption></figcaption>
    </figure>    
    Now, we can run the above program using standard python:3 image as shown below. run the command.
</p> 

<!-- <p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker run --rm -it -v $(pwd):/First python:3 python /FirstApp/src/app.py</p> -->
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker run --rm -it -v "%cd%":/FirstApp python:3 python /FirstApp/src//app.py</p>
<b>Output:</b>
<p class="cmd">
Hello World!
</p>

<h3><a name="section7">Creating custom Docker image with Dockerfile</a></h3>
<p>Let's add Dockerfile as shown below inside the folder <b>FirstApp</b></p>

{% highlight shell %}

	# Dockerfile
	FROM python:3
	WORKDIR /src
	COPY /src .
	CMD [ "python", "app.py" ]

{% endhighlight %}

<p>
    Your code should look like below.
    <figure>
      <img src="/images/firstapp_code_2.png" alt="code screenshot" width="50%" height="50%" />
      <figcaption></figcaption>
    </figure>    
    Now, run the below commands for creating our custom image using standard python:3 image and list all images.
</p> 
	
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker build -t firstpy .</p>
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker image ls</p>
<b>Output:</b>
<p class="cmd">
REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
<br>firstpy                                 latest              085903a75b6b        3 hours ago         938M
<br>
<br>
</p>

<p>Using below command we can run our custom image. You will see Hello World! on console.</p>
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker run firstpy</p>
<b>Output:</b>
<p class="cmd">
Hello World!
</p>

<h3><a name="section8">Running Flask inside the container</a></h3>
<p>Let's convert our simple program to Flask app. 
<br>Add this new line to Dockerfile <i>RUN pip3 install Flask</i>. Adding above line to Dockerfile will install Flask libraries to the image.
</p>

{% highlight shell %}

	# Dockerfile
	FROM python:3
	# NEW LINE
	RUN pip3 install Flask
	WORKDIR /src
	COPY /src .
	CMD [ "python", "app.py" ]

{% endhighlight %}

<p>also, modify app.py as shown below.</p>
{% highlight python %}
# file: app.py

from flask import Flask
import os
import socket

app = Flask(__name__)

@app.route("/")
def hello():

    html = "<h3>Hello {name}!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>"
    return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)

{% endhighlight %}	

<p>
    <figure>
      <img src="/images/firstapp_flask_code.png" alt="code screenshot" width="50%" height="50%" />
      <figcaption>Flask App</figcaption>
    </figure>    
    Ideally, we have to install the dependencies using pip requirements file. Below shown the requirements.txt file that specifying Flask as dependency for the application. And adding <i>RUN pip3 install -r requirements.txt</i> to Dockerfile just do the same here. It will the dependecies specified in the file to the image.
</p> 

{% highlight xml %}
# file: requirements.txt

Flask
{% endhighlight %}

<p>Now, build the image again using below command.</p> 	
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker build -t firstpy .</p>
<b>Output:</b>
<p class="cmd">
Sending build context to Docker daemon  3.584kB
<br>Step 1/5 : FROM python:3
<br> ---> a4cc999cf2aa
<br>Step 2/5 : RUN pip3 install Flask
<br> ---> Using cache
<br> ---> e0323175dcee
<br>Step 3/5 : WORKDIR /src
<br> ---> Using cache
<br> ---> 5d3e697fe7c3
<br>Step 4/5 : COPY /src .
<br> ---> Using cache
<br> ---> d0c1dbb6056d
<br>Step 5/5 : CMD [ "python", "app.py" ]
<br> ---> Using cache
<br> ---> 085903a75b6b
<br>Successfully built 085903a75b6b
<br>SECURITY WARNING: You are building a Docker image from Windows against a non-Windows Docker host. All files and directories added to build context will have '-rwxr-xr-x' permissions. It is recommended to double check and reset permissions for sensitive files and directories.
</p>

<p>So far, we have run Docker container in interactive mode. Let's run the Flask app image in detached mode as specified below. This command will do the following things. Note: Make sure you are using unused port also.
<ul>  
  <li>Runs Flask app in detached mode as specified by -d switch using the port 8080 as specified by -p switch.</li>  
  <li>Removes the container specified by --rm switch.</li>
</ul>
</p>
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker run --rm -d -p 8080:80 firstpy</p>

<p>In case, you have come across below error, restart the Docker as shows in the below screenshot.</p>
<b>Output:</b>
<p class="cmd">
docker: Error response from daemon: driver failed programming external connectivity on endpoint distracted_bhabha (ed515f04e2926e48c0231bc5e7bc7c6adab303c9fbc07fc342ad3ce74a2e6442): Error starting userland proxy: mkdir /port/tcp:0.0.0.0:8080:tcp:172.17.0.2:80: input/output error.
</p>

<p>
    <figure>
      <img src="/images/docker-restart.png" alt="code screenshot" width="50%" height="50%" />
      <figcaption></figcaption>
    </figure>    
</p> 

<p>If running successfully, you will see below sample output.</p>
<b>Output:</b>
<p class="cmd">
3c58c2854897756bb709aefd2ea34b3e686ab31d02e2070f8a73612ad247fe73
<br>
<br>
</p>

<p>Run below command to list all running containers.</p>
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker ps</p>
<b>Output:</b>
<p class="output">
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                  NAMES
<br>3c58c2854897        firstpy             "python app.py"     42 seconds ago      Up 40 seconds       0.0.0.0:8080->80/tcp   eager_hamilton
<br>
<br>
</p>

<p>Run below command to check the logs from the running container.</p>
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker logs 3c58c2854897</p>
<b>Output:</b>
<p class="cmd">
* Serving Flask app "app" (lazy loading)
<br>* Environment: production
<br>   WARNING: This is a development server. Do not use it in a production deployment.
<br>   Use a production WSGI server instead.
<br>* Debug mode: off
<br>* Running on http://0.0.0.0:80/ (Press CTRL+C to quit)
<br>
</p>

<p>
Open browser, point to http://localhost:8080. You will se below output.
    <figure>
      <img src="/images/browser-output.png" alt="browser screenshot" width="50%" height="50%" />
      <figcaption></figcaption>
    </figure>    
</p> 

<p>Run below command to stop the container. You can find the container ID using <i>docker ps</i> command.</p>
<p class="cmd">C:\&gt;Users&gt;King&gt;Desktop&gt;docker stop 3c58c2854897</p>
<p>

### What do we need to rollout an ASP.NET website to a windows docker container? ###

When you run an ASP.NET 4.X website then you need the following things:

*   The Operating system with IIS installed
*   ASP.NET 4.X installed
*   Webdeploy installed

### Building the container with IIS, ASP.NET and Webdeploy ###

Here are the steps you need to take to create a docker container that has all these required ingredients:

Fist we need a basic operating system image from docker hub. For this we already got the image for you (take long time) that you can check this with the following command:

**docker images**

This should output something similar to the following screenshot:

[![image](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/08/image_thumb.png?resize=676%2C122 "image")](https://i2.wp.com/fluentbytes.com/wp-content/uploads/2016/08/image.png)

Now we can start adding the first layer and that is installing IIS. For this you can use the **dism** command on windows and pass it in the arguments to install the IIS webserver role to windows server core. You can do this at an interactive prompt or use the docker **build** command. I prefer the later and for this we create a dockerfile that contains the following statements:

**FROM microsoft/windowsservercore   

RUN dism /online /enable-feature /all /featurename:iis-webserver /NoRestart**

After saving the file under the name dockerfile without any extensions you run a command line to build the image:

**docker build -t windowsserveriis .**

The command tells docker to build an image, give it the tag windowsserveriis and use the current folder (denoted with the dot) as the context to build the image. this means that everything stated in the dockerfile is relative to that context. Note that you are only allowed to use lowercase characters for the tagename.

After running the command you now have a new docker image with the name **windowsserveriis**

If you now run the command:

**docker images**

You will see the new image available

[![image](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/08/image_thumb-1.png?resize=676%2C122 "image")](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/08/image-1.png)

We can take the next step and that is to install ASP.NET 4.5

We can do this in a similar way, by creating a docker file with the following commands:

**FROM windowsserveriis
**RUN  dism /online /enable-feature /featurename:IIS-ASPNET45****

**

and again after saving the file you can run the command line to build the image:

**docker build –t windowsserveriisaspnet .**

Now we have an image that is capable of running an ASP.NET application. The next step is that we need webdepoy to be installed in the container. For this we need to download the installer for webdeploy and then issue an command that will install and wait for the installation to finish. We first download the installer in the same folder as the dockerfile and then we will add it to the image. In the following steps I assume you already downloaded the MSI (WebDeploy_2_10_amd64_en-US.msi) and have it in the same folder as the dockerfile. When installing the msi we will use msiexec and need to start a process that we can wait on to be done. If we would only run msiexec, then this command returns and runs in the background, making the container to exit, leaving us in an undefined state.

When you create the following dockerfile, you install webdeploy:

**FROM windowsserveriisaspnet**

**RUN mkdir c:\install**

**ADD WebDeploy_2_10_amd64_en-US.msi /install/WebDeploy_2_10_amd64_en-US.msi**

**WORKDIR /install**

**RUN powershell start-Process msiexec.exe -ArgumentList '/i c:\install\WebDeploy_2_10_amd64_en-US.msi /qn' -Wait**



Note that we are using powershell start-process with the –wait option, so we wait for the installation to finish, before we commit the new layer.

Now run the docker command again to build the image using the new dockerfile:

**docker build –t windowsserveriisaspnetwebdeploy .**

Now we have an image that is capable to host our website in IIS and use webdeploy to install our website.

### Doing it all in one dockerfile ###

In the previous steps we created a new docker file for each step. But it is probably better to do this in one file, batching all commands together leaving you with the same endstate. We can also optimize the process a bit, since Microsoft already provides an image called microsoft/iis that has the iis feature enabled. This means we can use that image as the base layer and skip the install of IIS.

The simplified docker file looks as follows:

**FROM microsoft/iis  
RUN dism /online /enable-feature /all /featurename:iis-webserver /NoRestart  
RUN mkdir c:\install  
ADD WebDeploy_2_10_amd64_en-US.msi /install/WebDeploy_2_10_amd64_en-US.msi  
WORKDIR /install  
RUN powershell start-Process msiexec.exe -ArgumentList '/i c:\install\WebDeploy_2_10_amd64_en-US.msi /qn' -Wait**

Now again we run the docker build command to get the docker image capable of running our website and use the webdeploy packages that can be produced by a standard ASP.NET build procedure.

**docker build –t windowsserveriisaspnetwebdeploy .**

The final step is to deploy your webdeploy package to the image.

### Getting the webdeploy package ###

Now before we can deploy our website we need to get the webdeploy package.

I assume you have a standard ASP.NET web project in Visual Studio. In this case you can very easily create the deploy package inside Visual Studio (in the next post I show you how to do this using VSTS/TFS builds)

When you right click the Visual Studio project you can select the publish option:

[![image](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image_thumb.png?resize=676%2C388 "image")](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image.png)

After selecting publish you will see the following dialog:

[![image](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image_thumb-1.png?resize=676%2C536 "image")](https://i2.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image-1.png)

In order to just create a package in stead of deploying to a server or Azure, I select Custom

[![image](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image_thumb-2.png?resize=676%2C534 "image")](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image-2.png)

then you give the profile a name, in my case dockerdeploydemo

[![image](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image_thumb-3.png?resize=676%2C533 "image")](https://i2.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image-3.png)

then we select web deploy package from the dropdown and provide the required information, package location and the name of the website

[![image](https://i2.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image_thumb-4.png?resize=676%2C539 "image")](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image-4.png)

next you can setup any database connections if you have any, in my case I have no database

[![image](https://i2.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image_thumb-5.png?resize=676%2C533 "image")](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image-5.png)

next, click publish and you will find the resulting deployment package and accompanying deployment files in the c:\temp-docker folder

[![image](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image_thumb-6.png?resize=676%2C136 "image")](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image-6.png)

Now that we have the webdeploy package and the accompanying deployment artifacts, we can again create a docker file that will then upload the package to the container and install the website in the container. This will then leave you with a complete docker image that runs your website.

### Publish the website in the docker container ### 

The dockerfile to deploy your website looks as follows:

**FROM windowsserveriisaspnetwebdeploy** 

**RUN mkdir c:\webapplication**

**WORKDIR /webapplication**

**ADD dockerdeploydemo.zip  /webapplication/dockerdeploydemo.zip**

**ADD dockerdeploydemo.deploy.cmd /webapplication/dockerdeploydemo.deploy.cmd  
ADD dockerdeploydemo.SetParameters.xml /webapplication/dockerdeploydemo.SetParameters.xml**

**RUN dockerdeploydemo.deploy.cmd, /Y**

We build the container again using the docker build command:

**docker build –t mycontainerizedwebsite .**

This now finally results in our web application in a container that we can then run on any windows server that has windows containers enabled.

### Running the website in the container ###

In order to test if we succeeded we now issue the docker **run** command and then map the container port 80 to a port on our host. This can be done by using the –p option, where you specify a source and destination port. We also need to specify a command that ensures the container keeps running. For this we now use e.g. a command like ping –t which will result in an endless ping loop, that is enough to keep the container running. so to test the container we now run the following command:

**docker run –p 80:80 mycontainerizedwebsite ping localhost -t**

Now we can browse to the website. Be aware that you can only reach the container from the outside, so if you would browse to localhost, which results in the 127.0.0.0 you will not see any results. You need to address your machine on its actual hostname or outside IP address.

### Summary  ###

To summarize what we have done, we first created a docker image capable of running IIS, then we added ASP.NET 4.5, then we added webdeploy and finally we deployed our website to the container using webdeploy and the package generated by Visual Studio.

In the next post I will show you how we can use this image in build and release management using VSTS and then deploy the container to a server so we can run automated tests as a stage in the delivery pipeline.

### Creating the docker image that has the website, from the build ###

When we want to use docker as part of our build, then we need the build agent to run on a host that has the docker capabilities build in. For this we can use either windows 10 anniversary edition, or we can use windows server 2016 Technical preview 5\. In my example I choose windows server 2016 TP5, since it is available from the azure gallery and gives a very simple setup. You choose the Windows server 2016 TP5 with containers as the base server and after you provision this in azure you download the build agent from VSTS and install it on the local server. After the agent is running, we can now create a build that contains several commands to create the container image.

First we need to ensure the build produces the required webdeploy package and accompanying artefacts and we place those in the artifact staging area. This is simply done by adding the following msbuild arguments to the build solution task that is part of a standard Visual Studio build template.

/p:DeployOnBuild=true /p:WebPublishMethod=Package /p:PackageAsSingleFile=true /p:SkipInvalidConfigurations=true /p:PackageLocation=$(build.stagingDirectory)

Then after we are done creating the package and copying the files to the artifacts staging location, we then add an additional copy task that copies the docker files I described in my previous post to the artifacts staging directory, so they become part of the output of my build. I put the docker files in my Git repo, so they are part of every build and versioned.

[![image](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image_thumb-7.png?resize=676%2C368 "image")](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/09/image-7.png)

After copying the docker files, we then add a couple of command line tasks that we will look at in more detail.

In the following screenshot you can see the additional build steps I used to make this work. The first extra command I added is the docker build command to build the image based on the dockerfile I described in my previous post. I just added the dockerfile to the Git repository as you normally do with all the infrastructure scripts you might have. The docker file contains the correct naming of the package that we produce in the build solution task.

[![backe image](https://i2.wp.com/fluentbytes.com/wp-content/uploads/2016/09/backe-image_thumb.png?resize=676%2C371 "backe image")](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/09/backe-image.png)

You see me passing in the arguments like I did in the previous post, to give the image a tag that I can use later in my release pipeline to run the image.

You see I am using a variable $(GitVersion.NugetVersionV2). this variable is available to me because I use the task GitVersion that you can get from the marketplace. GitVersion determines the semantic version of the current build, based on your branch and changes and this is override able by using git commit messages. For more info on this task and how it works you can go [here](http://gitversion.readthedocs.io/en/latest/)

Now after I create the image, I also want to be able to use it on any of my machines, by using the dockerhub as a repository for my images. So the next step is to login to dockerhub

[![login to dockerhub](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/09/login-to-dockerhub_thumb.png?resize=676%2C368 "login to dockerhub")](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/09/login-to-dockerhub.png)

After I have logged in to dockerhub, I can now push the newly created image to the repository.

[![push to dockerhunb](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/09/push-to-dockerhunb_thumb.png?resize=676%2C371 "push to dockerhunb")](https://i2.wp.com/fluentbytes.com/wp-content/uploads/2016/09/push-to-dockerhunb.png)

And now we are done with our build. Next is using the image in our release pipeline

### Running a docker image in the release pipeline ###

Now I go to release management and create a new release definition. What I need to do to run the docker container, is I need the release agent to run on the docker capable machine, exactly the same as with the build. Next we can then issue commands on that machine to run the image and it will pull it from dockerhub when not found on the local machine. Here you can see the release pipeline with two environments, test and production.

[![release-dockerrun](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/09/release-dockerrun_thumb.png?resize=676%2C368 "release-dockerrun")](https://i2.wp.com/fluentbytes.com/wp-content/uploads/2016/09/release-dockerrun.png)

As you can see the first step is nothing more then issuing the docker run command and mapping the port 80 of the container to 80 on the machine. We Also use the –detach option, since we don’t want the agent to be blocked on running the container, so this starts the container and releases control back to the release agent. I also pass it in a name, so I can use the same name in a later stage to stop the image and remove it.

Next I run a set of CodedUI tests to validate if my website is running as expected and then I use the following docker command to stop the container:

[![release-stopcontaienr](https://i0.wp.com/fluentbytes.com/wp-content/uploads/2016/09/release-stopcontaienr_thumb.png?resize=676%2C360 "release-stopcontaienr")](https://i2.wp.com/fluentbytes.com/wp-content/uploads/2016/09/release-stopcontaienr.png)

**docker stop $(docker.processname)**

the variable $(docker.processname) is just a variable I defined for this release template and just contains an arbitrary name that I can then use cross multiple steps.

Finally I am running the command to remove the container after use. This ensures I can run the pipeline again with a new image after the next build

[![release-removecontainer](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/09/release-removecontainer_thumb.png?resize=676%2C343 "release-removecontainer")](https://i1.wp.com/fluentbytes.com/wp-content/uploads/2016/09/release-removecontainer.png)

For this I use the docker command:

**docker rm –f $(docker.processname)**

I used the –f flag,  and I set the task to always run, so I am guaranteed this image is removed and even after a non successful release. this ensures the repeatability of the process which is of course very important.



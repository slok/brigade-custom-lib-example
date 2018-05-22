FROM deis/brigade-worker:v0.13.0

# Copy the sources.
# WARNING! UGLY HACK! Copy all the sources and set the correct import file.
COPY ./src/ /home/src/src/

# For now we have to copy the library, it's not an standalone lib so we need to
# install manually the libraries of "dependencies" in the package.json file. Sad
# but true... :(
#For example:
#    yarn add url-join@^4.0.0 && \
RUN cp /home/src/src/custom-lib/brigadier.ts_hack /home/src/src/custom-lib/brigadier.ts && \   
    yarn build

FROM deis/brigade-worker:v0.13.0

# Work at user level.
ARG uid=1000
ARG gid=1000
RUN addgroup -g $gid custom || true && \
    adduser -D -u $uid -G $gid custom || true && \
    chown $uid:$gid -R /home/src

USER $uid
WORKDIR /home/custom

FROM couchdb:2.3.1
# need default.ini to enable cors
COPY default.ini /opt/couchdb/etc/local.d/
#COPY bb.json bb.json
#RUN curl -s -S -X PUT db:5984/bb 
#RUN curl -s -S -X PUT localhost:5984/_users 
#RUN curl -s -S -X PUT localhost:5984/_replicator 
#RUN curl -s -S localhost:5984/_all_dbs
#RUN curl -X POST http://db:5984/_replicate -d '{"source": "https://mediterranean-migration.com/api/bb", "target": "http://db:5984/bb", "create_target": false, "continuous": false, "owner": "admin", "user_ctx": {"name": "admin", "roles": ["_admin"]}}' -H "Content-Type: application/json"
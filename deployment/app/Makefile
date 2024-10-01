pull.images:
	./scripts/pullImages.sh

reload.images:
	./scripts/resetImage.sh
	
db.up:
	docker-compose -f docker-compose.db.yml up -d
	for number in 1 2 3 4 5 6 ; do \
        echo $$number ; \
        sleep 1 ; \
    done
	
db.down:
	docker-compose -f docker-compose.db.yml down

# remove database data
db.clean:
	sudo rm -rf postgres_data

api.up:
	docker-compose -f docker-compose.api.yml up -d 

api.down:
	docker-compose -f docker-compose.api.yml down

web.up:
	docker-compose -f docker-compose.web.yml up -d 

web.down:
	docker-compose -f docker-compose.web.yml down
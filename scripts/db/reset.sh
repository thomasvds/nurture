PORT=5432
HOST='postgres'
USER='nurtureDBUser'
DB='nurtureDB'

for i in "$@"
do
case $i in
    --port=*)
    PORT="${i#*=}"
    shift 
    ;;
    --host=*)
    HOST="${i#*=}"
    shift 
    ;;
    --user=*)
    USER="${i#*=}"
    shift 
    ;;
    --db=*)
    DB="${i#*=}"
    shift 
    ;;
    *)
    echo "Unknown option $i"
    ;;
esac
done

# DROP DB AND CREATE A NEW ONE FROM SCRATCH
dropdb -h $HOST -p $PORT -U $USER -W $DB
createdb --owner=$USER -h $HOST -p $PORT -U $USER -W $DB
# ONLY APPLIES IN CASE OF NON-DOCKER LOCAL SETUP
psql -d $DB -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'

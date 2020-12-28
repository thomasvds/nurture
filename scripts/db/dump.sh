PORT=5432
HOST='localhost'
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
    --file=*)
    FILE_PATH="${i#*=}"
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

pg_dump -h $HOST -p $PORT -U $USER $DB -f $FILE_PATH
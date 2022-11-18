import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getTripById, updateTripDetail } from '../databaseHandler';
import { Param } from '../models/Param';
import { Trip } from '../models/Trip';
import './TripDetail.css';

const TripDetail: React.FC = () => {
  const param: Param = useParams();
  const [requireDate, setRequireDate] = useState<boolean>(false);
  const [risk, setRisk] = useState();
  const [trip, setDetailTrip] = useState<Trip>({});

  useEffect(() => {
    const fetchTripByTripId = async (id: number) => {
      const data = await getTripById(id);
      setDetailTrip(data);
      setRisk(data.risk_asesment);
    };
    fetchTripByTripId(+param.id);
  }, [param.id]);

  const dateSelectedHandler = (e: any) => {
    const dateSelected = new Date(e.detail.value);
    setDetailTrip({
      ...trip,
      time: dateSelected.toLocaleTimeString(),
      date: dateSelected.toLocaleDateString('en-GB'),
    });
  };

  const handleUpdate = () => {
      const updateNewTrip = async () => {
        await updateTripDetail(trip);
      };
      updateNewTrip();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>M-Expense</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1 className="link-btn">Trip Detail</h1>

        <IonList>
          {/* Reporter Name */}
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              value={trip.name_of_reporter}
              onIonChange={(e) => {
                const newNameOfReporter =
                  e.detail.value !== null ? e.detail.value : '';
                setDetailTrip({ ...trip, name_of_reporter: newNameOfReporter });
              }}
              placeholder="Enter name"
            ></IonInput>
          </IonItem>

          {/* Activity Name */}
          <IonItem>
            <IonLabel position="floating">Trip name</IonLabel>
            <IonInput
              value={trip.activity_name}
              onIonChange={(e) => {
                const newActivityName =
                  e.detail.value !== null ? e.detail.value : '';
                setDetailTrip({ ...trip, activity_name: newActivityName });
              }}
              placeholder="Enter trip name"
            ></IonInput>
          </IonItem>

          {/* Destination */}
          <IonItem>
            <IonLabel position="floating">Destination</IonLabel>
            <IonInput
              value={trip.destination}
              onIonChange={(e) => {
                const newDestination =
                  e.detail.value !== null ? e.detail.value : '';
                setDetailTrip({ ...trip, destination: newDestination });
              }}
              placeholder="Enter your destination"
            ></IonInput>
          </IonItem>

          {/* Description */}
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
            <IonInput
              value={trip.description}
              onIonChange={(e) => {
                const newDescription =
                  e.detail.value !== null ? e.detail.value : '';
                setDetailTrip({ ...trip, description: newDescription });
              }}
              placeholder="Enter description"
            ></IonInput>
          </IonItem>

           {/* Cost */}
           <IonItem>
            <IonLabel position="floating">Cost</IonLabel>
            <IonInput
              value={trip.cost}
              onIonChange={(e) => {
                const newCost =
                  e.detail.value !== null ? e.detail.value : '';
                setDetailTrip({ ...trip, cost: newCost });
              }}
              placeholder="Enter cost"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Date and Time</IonLabel>
            <IonInput value={trip.date} id="tripDetailDate"></IonInput>
            <IonPopover
              keepContentsMounted={true}
              trigger="tripDetailDate"
              triggerAction="click"
            >
              <IonDatetime onIonChange={(e) => dateSelectedHandler(e)}>
                {' '}
              </IonDatetime>
            </IonPopover>
          </IonItem>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Risk Assessment</IonLabel>
              <IonSelect
                value={risk}
                placeholder="Select risk assessment"
                onIonChange={(e) => setRisk(e.detail.value)}
              >
                <IonSelectOption value="Yes">Yes</IonSelectOption>
                <IonSelectOption value="No">No</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <IonButton
            color="primary"
            class="ion-margin"
            fill="solid"
            onClick={handleUpdate}
          >
            Update
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TripDetail;

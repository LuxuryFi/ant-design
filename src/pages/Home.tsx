import {
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonRouterLink,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import { useState } from 'react';
import { insertTrip } from '../databaseHandler';
import { Trip } from '../models/Trip';

import './Home.css';

const Home: React.FC = () => {
  const [emptyActivityName, setRequireActivityName] = useState<boolean>(false);
  const [emptyDestination, setRequireDesination] = useState<boolean>(false);
  const [emptyDescription, setRequireDescription] = useState<boolean>(false);
  const [emptyDate, setRequireDate] = useState<boolean>(false);
  const [activityName, setActivityName] = useState<string>('');
  const [reporterName, setReporterName] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  const [riskyAssessment, setRiskyAssessment] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tripDate, setDetailTripDate] = useState<string>('');
  const [tripTime, setDetailTripTime] = useState<string>();

  const saveHandler = async () => {
    let valid = true;

    // Activity Name
    if (activityName === '') {
      valid = false;
      setRequireActivityName(true);
    }

    // Destination
    if (destination === '') {
      valid = false;
      setRequireDesination(true);
    }

    // Description
    if (description === '') {
      valid = false;
      setRequireDescription(true);
    }

    // Date
    if (tripDate === '') {
      valid = false;
      setRequireDate(true);
    }

    if (valid) {
      setRequireActivityName(false);
      setRequireDesination(false);
      setRequireDescription(false);
      setRequireDate(false);

      const newTrip: Trip = {
        name_of_reporter: reporterName,
        activity_name: activityName,
        destination: destination,
        description: description,
        risky_assessment: riskyAssessment,
        date: tripDate,
        time: tripTime,
        cost: cost,
      };

      try {
        await insertTrip(newTrip);
        alert('Created new trip successfully!');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const dateSelectedHandler = (e: any) => {
    const dateSelected = new Date(e.detail.value);
    setDetailTripTime(dateSelected.toLocaleTimeString());
    setDetailTripDate(dateSelected.toLocaleDateString('en-GB'));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>M-Expense</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Reporter Name */}
        <IonItem>
          <IonLabel position="floating">Reporter Name</IonLabel>
          <IonInput
            onIonChange={(e) => setReporterName(e.detail.value!)}
          ></IonInput>
        </IonItem>

        {/* Activity Name */}
        <IonItem>
          <IonLabel position="floating">Activity Name</IonLabel>
          <IonInput
            onIonChange={(e) => setActivityName(e.detail.value!)}
          ></IonInput>
          <IonText
            className={`text-error ${emptyActivityName ? 'active' : ''}`}
          >
            Enter activity name!
          </IonText>
        </IonItem>

        {/* Destination */}
        <IonItem>
          <IonLabel position="floating">Destination</IonLabel>
          <IonInput
            onIonChange={(e) => setDestination(e.detail.value!)}
          ></IonInput>
          <IonText className={`text-error ${emptyDestination ? 'active' : ''}`}>
            Enter destination!
          </IonText>
        </IonItem>
          {/* Cost */}
          <IonItem>
          <IonLabel position="floating">Cost</IonLabel>
          <IonInput
            onIonChange={(e) => setCost(e.detail.value!)}
          ></IonInput>
        </IonItem>

        {/* Description */}
        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
            onIonChange={(e) => setDescription(e.detail.value!)}
          ></IonInput>
          <IonText className={`text-error ${emptyDescription ? 'active' : ''}`}>
            Enter description!
          </IonText>
        </IonItem>

        {/* Date */}
        <IonItem>
          <IonLabel position="floating">Date and Time</IonLabel>
          <IonInput value={tripDate} id="tripDate"></IonInput>
          <IonPopover
            keepContentsMounted={true}
            trigger="tripDate"
            triggerAction="click"
          >
            <IonDatetime onIonChange={(e) => dateSelectedHandler(e)}>
              {' '}
            </IonDatetime>
          </IonPopover>
          <IonText className={`text-error ${emptyDate ? 'active' : ''}`}>
            You need to select date and time!
          </IonText>
        </IonItem>

        {/* Risky Assessment */}
        <IonList>
          <IonItem>
            <IonLabel position="floating">Risky Assessment</IonLabel>
            <IonSelect
              placeholder="Select risky assessment"
              onIonChange={(e) => setRiskyAssessment(e.detail.value)}
            >
              <IonSelectOption value="Yes">Yes</IonSelectOption>
              <IonSelectOption value="No">No</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <IonButton expand="block" class="ion-margin" onClick={saveHandler}>
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

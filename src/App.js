import { useEffect, useState } from "react";
import { studentsDateBase } from "./firebaseConfig/firebase";
import { getDocs, collection } from "firebase/firestore";
import MainStudentInfo from "./components/MainStudentInfo";
import Studentdetails from "./components/Studentdetails";
import Header from "./components/Header";
import Footer from "./components/footer";

function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  return (
    <>
      <Header />
      {isLoading && <Loader />}
      {!hideForm && (
        <LogInForm
          students={students}
          setStudents={setStudents}
          setIsloading={setIsloading}
          setHideForm={setHideForm}
        />
      )}
      <div className="content">
        <MainStudentInfo students={students} />
        <Studentdetails students={students} />
      </div>
      <Footer />
    </>
  );
}
/* eslint-disable react/prop-types */
function LogInForm({ setStudents, setIsloading, setHideForm }) {
  const studentsCollectionRef = collection(studentsDateBase, "students");
  const [entredRegNo, setEnteredRegNo] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [wrongRegNo, setWrongRegNo] = useState(false);
  const [inpuName, setInputName] = useState("");
  const [inpuNameEmpty, setInputNameEmpty] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setIsButtonClicked(true);
    if (!inpuName) {
      setInputNameEmpty(true);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    if (!isButtonClicked) return;
    if (!inpuName) return;
    function checkId(el) {
      return entredRegNo === el.registrationNumber;
    }
    setIsloading(true);

    async function getStudentsList() {
      try {
        const data = await getDocs(studentsCollectionRef, {
          signal: controller.signal,
        });
        const pureData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const filteredData = pureData.filter(checkId);
        setStudents(filteredData);
        if (filteredData.length === 0) {
          setIsloading(false);
          setWrongRegNo(true);
        } else {
          setWrongRegNo(false);
          setIsloading(false);
          setHideForm(true);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }

    getStudentsList();

    return function () {
      controller.abort();
    };
  }, [isButtonClicked, entredRegNo]);
  return (
    <div className="login-from">
      <h2>املأ النموذج</h2>
      <form>
        <label>أدخل اسمك الكامل</label>
        <input
          className={inpuNameEmpty ? "wrong-reg-no" : ""}
          value={inpuName}
          type="text"
          placeholder="علي عبدي يوسف"
          onChange={(e) => setInputName(e.target.value)}
          required
        ></input>

        {inpuNameEmpty && (
          <p className="wrong-reg-no-message">
            الرجاء إدخال رقم التسجيل الصحيح
          </p>
        )}

        <label>أدخل رقم التسجيل الخاص بك</label>
        <input
          className={wrongRegNo ? "wrong-reg-no" : ""}
          value={entredRegNo}
          type="number"
          placeholder="0072"
          onChange={(e) => setEnteredRegNo(Number(e.target.value))}
        ></input>
        {wrongRegNo && (
          <p className="wrong-reg-no-message">
            الرجاء إدخال رقم التسجيل الصحيح
          </p>
        )}
        <button onClick={handleSubmit}>أدخل</button>
      </form>
    </div>
  );
}

function Loader() {
  return (
    <>
      <div className="loader"></div>
      <div className="overlay"></div>
    </>
  );
}

export default App;

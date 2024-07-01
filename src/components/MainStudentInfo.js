/* eslint-disable react/prop-types */
function MainStudentInfo({ students }) {
  return (
    <div>
      {students.map((student) => (
        <div key={student.id} className="main-data">
          <div className="img-name">
            <img
              className="studnet-image"
              src={student.image}
              alt="student-img"
            ></img>
            <h2>{student.name}</h2>
          </div>
          <div className="main-info">
            <p>
              {student.registrationNumber < 1000
                ? "00" + student.registrationNumber
                : student.registrationNumber}
            </p>
            <p>
              <strong>: رقم التسجيل</strong>
            </p>
            <p>{student.sex}</p>
            <p>
              <strong>: الجنس</strong>
            </p>
            <p>{student.id}</p>
            <p>
              <strong>: الرقم التسلسلي</strong>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainStudentInfo;

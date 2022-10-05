import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mainlayout from "./../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  change_text_category,
  delete_category,
  delete_category_mtod,
  new_category,
  reload_category_section,
  set_category,reload_category
} from "../redux/actions/counter";
import { CalendarAdd, CloseSquare } from "iconsax-react";
import Tab from './../components/common/Tab';

const Categorypage = () => {
  const lang = localStorage.getItem("language");
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const taxtcategory = useSelector((state) => state.txtcategory);
  const categorys = useSelector((state) => state.categorys);
  const categoryId = useSelector((state) => state.categoryID);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  if (windowSize.innerWidth > 1000) {
    navigate("/");
  }
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    dispatch(reload_category());
    dispatch(reload_category_section());
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <Fragment>
      <Mainlayout>
        <Fragment>
          {" "}
          <div
            className="alert alert-light  border-rightW todobox "
            style={{ cursor: "pointer" }}
            role="alert"
            onClick={() => {
              navigate("/document");
            }}
          >
            <div
              className="text"
              style={{
                textAlign: lang === "fa" ? "right" : "left",
                width: "100%",
              }}
            >
              مستندات
            </div>
          </div>
          <div
            className="alert alert-light  border-rightW todobox "
            style={{ cursor: "pointer" }}
            role="alert"
            onClick={() => {
              navigate("/setting");
            }}
          >
            <div
              className="text"
              style={{
                textAlign: lang === "fa" ? "right" : "left",
                width: "100%",
              }}
            >
              تنضیمات
            </div>
          </div>
          <br />
          دسته بندی کارها
          <br />
          <Tab
              datatoggle="modal"
              datatarget="#exampleModalCenter"
              classNameNew={"dashed"}
              text={
                <div>
                  <CalendarAdd size="32" color="#0d6efd" variant="Bulk" /> Add
                </div>
              }
            ></Tab>
          <br />
          {categorys.map((item) => {
            console.log(categorys, item);
            return (
              <Fragment>
                <div
                  className="alert alert-light  border-rightW todobox "
                  style={{
                    cursor: "pointer",
                    borderRight:
                      categoryId === item.id
                        ? "10px solid rgb(255, 43, 107)"
                        : null,
                    padding: 0,
                  }}
                  role="alert"
                >
                  <div
                    className="text"
                    style={{
                      textAlign: lang === "fa" ? "right" : "left",
                      width: "100%",
                      padding: 15,
                    }}
                    onClick={() => {
                      dispatch(set_category(item.id));
                      navigate("/");
                    }}
                  >
                    {item.name}
                  </div>
                  <CloseSquare
                    size="34"
                    color="#f47373"
                    variant="Bulk"
                    style={{ marginRight: 15 }}
                    onClick={() => {
                      dispatch(set_category("default"));
                      dispatch(delete_category_mtod(item.id));
                      dispatch(delete_category(item.id));
                    }}
                  />
                </div>
              </Fragment>
            );
          })}
          <div
            className="alert alert-light  border-rightW todobox "
            style={{
              cursor: "pointer",
              borderRight:
                categoryId === "default"
                  ? "10px solid rgb(255, 43, 107)"
                  : null,
            }}
            role="alert"
            onClick={() => {
              dispatch(set_category("default"));
              navigate("/");
            }}
          >
            <div
              className="text"
              style={{
                textAlign: lang === "fa" ? "right" : "left",
                width: "100%",
              }}
            >
              default
            </div>
          </div>
        </Fragment>
      </Mainlayout>
      <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Set Category
                </h5>
              </div>
              <div class="modal-body">
                <label>Category</label>
                <input
                  type="text"
                  style={{ width: "100%" }}
                  className="form-control"
                  value={taxtcategory}
                  onChange={(e) =>
                    dispatch(change_text_category(e.target.value))
                  }
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => dispatch(change_text_category(""))}
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => {
                    dispatch(new_category(taxtcategory));
                    dispatch(change_text_category(""));
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default Categorypage;

import axios, { AxiosResponse } from "axios";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categoryDTO } from "../categories/category.model";
import { urlCategories, urlPackagesBox } from "../utils/endpoints";
import Button from "../utils/Buttons";
import Pagination from "../utils/Pagination";
import ListPackages from "./ListPackageBox";
import { packageBoxDTO } from "./packagesBox.model";

export default function FilterPackage() {
  const valueInit: FilterPackageForm = {
    name: "",
    categoryId: 0,
    priorityShipping: false,
    // inWarehouse: false,
    page: 1,
    recordsPerPage: 6,
  };

  const [categories, setCategories] = useState<categoryDTO[]>([]);
  const [packageBox, setPackagesBox] = useState<packageBoxDTO[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    axios
      .get(`${urlCategories}/all`)
      .then((answer: AxiosResponse<categoryDTO[]>) => {
        setCategories(answer.data);
      });
  }, []);

  useEffect(() => {
    if (query.get("name")) {
      valueInit.name = query.get("name")!;
    }

    if (query.get("categoryId")) {
      valueInit.categoryId = parseInt(query.get("categoryId")!, 10);
    }

    if (query.get("priorityShipping")) {
      valueInit.priorityShipping = true;
    }

    // if (query.get("inWarehouse")) {
    //   valueInit.inWarehouse = true;
    // }

    if (query.get("page")) {
      valueInit.page = parseInt(query.get("page")!, 10);
    }

    findPackages(valueInit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function findPackages(values: FilterPackageForm) {
    modifyURL(values);
    axios
      .get(`${urlPackagesBox}/filter`, { params: values })
      .then((answer: AxiosResponse<packageBoxDTO[]>) => {
        const totalRegisters = parseInt(
          answer.headers["quantityTotalRegisters"],
          10
        );
        setTotalPages(Math.ceil(totalRegisters / valueInit.recordsPerPage));

        setPackagesBox(answer.data);
      });
  }

  function modifyURL(values: FilterPackageForm) {
    const queryStrings: string[] = [];
    if (values.name) {
      queryStrings.push(`name=${values.name}`);
    }

    if (values.categoryId !== 0) {
      queryStrings.push(`categoryId=${values.categoryId}`);
    }

    if (values.priorityShipping) {
      queryStrings.push(`priorityShipping=${values.priorityShipping}`);
    }

    // if (values.inWarehouse) {
    //   queryStrings.push(`inWarehouse=${values.inWarehouse}`);
    // }

    queryStrings.push(`page=${values.page}`);

    navigate(`/packagebox/filter?${queryStrings.join("&")}`);
  }

  return (
    <>
      <h3>Filtro Paquetes</h3>
      <Formik
        initialValues={valueInit}
        onSubmit={(values) => {
          values.page = 1;
          findPackages(values);
        }}
      >
        {({ submitForm, getFieldProps, setValues, values }) => (
          <>
            <Form>
              <div className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="name" className="sr-only">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Nombre del Paquete"
                    {...getFieldProps("name")}
                  />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                  <select
                    className="form-control"
                    {...getFieldProps("categoryId")}
                  >
                    <option value="0">--Selecciona una Categoria--</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mx-sm-3 mb-2">
                  <Field
                    className="form-check-input"
                    id="priorityShipping"
                    name="priorityShipping"
                    type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="priorityShipping">
                    Próximos Paquetes
                  </label>
                </div>
                {/* <div className="form-group mx-sm-3 mb-2">
                  <Field
                    className="form-check-input"
                    id="inWarehouse"
                    name="inWarehouse"
                    type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="inWarehouse">
                    Paquetes en Stock
                  </label>
                </div> */}

                <Button
                  className="btn btn-primary mb-2 mx-sm-3"
                  onClick={() => submitForm()}
                >
                  Filtrar
                </Button>
                <Button
                  className="btn btn-danger mb-2"
                  onClick={() => {
                    setValues(valueInit);
                    findPackages(valueInit);
                  }}
                >
                  Limpiar
                </Button>
              </div>
            </Form>

            <ListPackages packageBox={packageBox} />
            <Pagination
              quantityTotalPages={totalPages}
              currentPage={values.page}
              onChange={(newPage) => {
                values.page = newPage;
                findPackages(values);
              }}
            />
          </>
        )}
      </Formik>
    </>
  );
}

interface FilterPackageForm {
  name: string;
  categoryId: number;
  priorityShipping: boolean;
  // inWarehouse: boolean;
  page: number;
  recordsPerPage: number;
}

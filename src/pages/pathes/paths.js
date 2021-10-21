import { useSelector } from "react-redux"
import Input from "../../common/elements/input"
import { useEffect, useState } from "react"
import DatatableTables from "../../components/Common/tables/DatatableTables"
import http from "../../services/httpServices"
import { paths as pathURL, POST_removePaths } from "../../helpers/url_helper"

const Paths = props => {
  const lang = useSelector(state => state.Login.lang)
  const user = useSelector(state => state.Login.user)
  const currentGroup = useSelector(state => state.selections.group)
  const [path, setPath] = useState({id: 0, name:'', group_id: 0})
  const [paths, setPaths] = useState([])
  const [selectedPaths, setSelectedPaths] = useState([])
  const [error, setError] = useState(false)
  const columns = [
    {
      dataField: "name",
      text: lang === "en" ? "Path Name" : "إسم المسار",
      sort: true
    }
  ]

  const selectPath = (path) => {
    console.log('selected', path)
    setPath(path)
  }

  const handleSelect = (path, isSelect) => {
    if (isSelect) {
      setSelectedPaths([...selectedPaths, path])
    } else {
      const pths = selectedPaths.filter(g => g.id !== path.id)
      setSelectedPaths(pths)
    }
  }

  const handleSelectAll = (isSelect) => {
    if (isSelect) setSelectedPaths(paths)
    else setSelectedPaths([])
  }

  const removeSelected = async () => {
    let ids = []
    selectedPaths.map(g => ids.push(g.id))
    setSelectedPaths([])
    await http.post(POST_removePaths, { ids })
    await loadPaths()
  }

  const loadPaths = async () => {
    const { data } = await http.get(`${pathURL}/${currentGroup.id}`)
    setPaths(data)
  }

  const save = async() => {
    if(path.id>0){
      await http.put(`${pathURL}/${path.id}`, path);
    }else{
      await http.post(pathURL, { name: path.name, group_id: currentGroup.id } );
    }
    setPath({id: 0, name: '', group_id: 0});
    await loadPaths();
  }

  useEffect(async () => {
    await loadPaths()
  }, [])

  return (
    <div className={"page-content"}>
      <div className={"alert alert-dark"} style={{ textAlign: "center" }}>
        <h3 style={{ padding: 0, margin: 0 }}>{lang === "en" ? "Paths" : "المسارات"}</h3>
      </div>

      <div style={{ margin: 10 }}>
        <Input
          label={lang === "en" ? "Path name" : "إسم المسار"}
          type={"text"}
          value={path.name}
          name={"path"}
          error={error}
          handleChange={({ _, value }) => setPath({ ...path, name: value })}
        />
        <button className={"btn btn-success"} onClick={save}>
          {lang==='en'? 'Save': 'حفظ'}
        </button>
      </div>

      <DatatableTables
        columns={columns}
        data={paths}
        selectDevice={selectPath}
        handleSelection={handleSelect}
        deleteBtn={(!selectedPaths.length > 0) && (user.role_id === 1)}
        handleSelectAll={handleSelectAll}
        removeSelected={removeSelected}
      />
    </div>
  )
}

export default Paths
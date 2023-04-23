import {Badge, Button, Checkbox, Divider, Grid, Spacer} from "@nextui-org/react";
import prompts from '../util/prompts'
import {useState} from "react";
import {HeartIcon} from "@/components/icon/HeartIcon";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PromptPage = () => {
  const keys = Object.keys(prompts)
  const values = Object.values(prompts)
  const [selectedKey, setSelectedKey] = useState(keys[0])
  const [formatPrompts, setFormatPrompts] = useState({})
  const [copyStr, setCopyStr] = useState()

  const updatePrompts = vals => {
    const formatPrompts = {}

    for (let key of keys) {
      let containsPrompts = Object.keys(prompts[key]).filter(item => vals.includes(item));
      if (containsPrompts.length > 0) {
        formatPrompts[key] = containsPrompts
      }
    }
    setFormatPrompts(formatPrompts)
    setCopyStr(Object.values(formatPrompts).flatMap(item => item).join(","))
  }

  return <div>

    <Grid.Container gap={2}>
      {
        keys.map(key => {
          let prompts = formatPrompts[key];
          return <Badge isSquared color={'error'} content={prompts ? prompts.length : 0} size="sm"
                        isInvisible={!formatPrompts[key]}>
            <Button bordered={selectedKey !== key}
                    onClick={() => setSelectedKey(key)}
                    style={{margin: 5}} auto>
              {key}
            </Button>
          </Badge>
        })
      }
    </Grid.Container>
    <Spacer/>
    <Divider/>
    <Spacer/>

    <Checkbox.Group
      label="勾选提示词"
      name={selectedKey}
      orientation="horizontal"
      onChange={updatePrompts}
    >
      <Grid.Container gap={2}>
        {
          Object.keys(prompts[selectedKey]).map(key => {
            let val = prompts[selectedKey][key];
            return <Checkbox value={key} style={{margin: 5}}>{val}</Checkbox>
          })
        }
      </Grid.Container>
    </Checkbox.Group>
    <Spacer/>
    <Divider/>
    {
      Object.keys(formatPrompts).length
        ? <div>
          <Spacer/>
          <CopyToClipboard
            text={copyStr}
            onCopy={() => {
              toast.info("复制成功", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000
              })
            }}
          >

            <Button
              auto
              color="success"
              icon={<HeartIcon fill="currentColor" filled/>}
            >
              复制
            </Button>
          </CopyToClipboard>
          <Spacer/>
        </div>
        : ''
    }
    {
      Object.keys(formatPrompts).map(key => {
        let val = formatPrompts[key];
        return <Checkbox.Group
          label={key}
          orientation="horizontal"
        >
          {val.join(",")}
        </Checkbox.Group>
      })
    }


    <ToastContainer/>

  </div>
}
export default PromptPage

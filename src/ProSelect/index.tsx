import React from 'react';
import { omit } from 'lodash';
import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';

export interface IEnumSelectProps<T, VT = string> extends SelectProps<VT> {
  /**
   * 数据源列表
   */
  list: T[];
  /**
   * key&值对应的 属性名
   */
  keyProp?: keyof { [key: string]: T }; // string, // keyof T,
  /**
   * label对应的属性名
   */
  labelProp?: keyof { [key: string]: T }; // keyof T
}

export default function <T>(props: IEnumSelectProps<T>) {
  const { list = [], keyProp = 'key', labelProp = 'label', onChange } = props;
  const selectProps = React.useMemo(() => omit(props, 'keyProp', 'labelProp', 'list', 'onChange'), [
    props,
  ]);

  const handleChange = (value, option) => {
    onChange && onChange(value, option);
  };

  return (
    <Select
      optionFilterProp="children"
      placeholder="-- 请选择 --"
      {...selectProps}
      onChange={handleChange}
    >
      {list.map((item) => (
        <Select.Option key={`${item[keyProp]}`} value={item[keyProp]}>
          {item[labelProp]}
        </Select.Option>
      ))}
    </Select>
  );
}

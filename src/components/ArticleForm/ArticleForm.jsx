import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Form, Input } from 'antd';

import { updateArticleData } from '../../store/actions';
import { postCreateArticle, putUpdateAticle } from '../../services/ApiService';

import classes from './ArticleForm.module.scss';


function ArticleForm() {
  const [form] = Form.useForm();
  
  const { id } = useParams();
  const articleData = useSelector((state) => state.article);
  

  const navigate = useNavigate();
 const dispatch = useDispatch();

  const onCreateArticle = async (values) => {
    const { title, description, text, tagsList } = values;
    const { token } = JSON.parse(localStorage.getItem('user'));

    const { article } = await postCreateArticle(title, description, text, tagsList, token);
    dispatch(updateArticleData(article));

    navigate(`/articles/${article.slug}`)
  };

  const onEditArticle = async (values) => {
    const { title, description, text, tagsList } = values;
    const { token } = JSON.parse(localStorage.getItem('user'));

    const { article } = await putUpdateAticle(id, title, description, text, tagsList, token);
    dispatch(updateArticleData(article));
    
    navigate(`/articles/${article.slug}`)
  };

  useEffect(() => {
    if (!id) {
      form.resetFields();
    }
  }, [id]);

  return (
    <div className={classes['article-form']}>
      <div className={classes.header}>
        {id ? 'Edit article' : 'Create new article'}
      </div>

      <div className={classes.main}>
        <Form form={form}
              name="create-article"
              className={classes.form}
              onFinish={id ? onEditArticle : onCreateArticle}
              initialValues={id ? { title: articleData.title, description: articleData.description, text: articleData.body, tagsList: articleData.tagList } : null}>
          <span className={classes.title}>Title</span>
          <Form.Item name="title" rules={[{required: true, message: 'Please input title'}]}>
            <Input placeholder="Title" />
          </Form.Item>
          <span className={classes.description}>Short description</span>
          <Form.Item name="description"
                    rules={[{required: true, message: 'Please input description'}]}>
            <Input placeholder="Short description" />
          </Form.Item>
          <span className={classes.text}>Text</span>
          <Form.Item name="text"
                    rules={[{required: true, message: 'Please input text'}]}>
            <Input.TextArea rows={7} placeholder="Text" />
          </Form.Item>
          <span className={classes.tags}>Tags</span>
          <Form.List name="tagsList">
            {(fields, { add, remove}) => (
              <>
                {fields.map((field, i) => (
                  <Form.Item key={field.key}>
                    <Form.Item {...field} rules={[{ whitespace: true }]} noStyle>
                      <Input style={{ width: 300 }} placeholder="Tag" />
                    </Form.Item>
                    <Button type="primary" ghost danger onClick={() => remove(field.name)} style={{ width: 120, marginLeft: 20, borderRadius: 5 }}>
                      Delete
                    </Button>
                    {i === fields.length - 1 ? (
                      <Button type="primary"  onClick={() => add()} ghost style={{ width: 120, marginLeft: 20, borderRadius: 5 }}>
                        Add tag
                      </Button>
                    ) : null}
                  </Form.Item>
                ))}
                {fields.length === 0 ? (
                  <Form.Item>
                    <Button type="primary" ghost onClick={() => add()} style={{ width: 120, borderRadius: 5 }}>
                      Add tag
                    </Button>
                  </Form.Item>
                ) : null}
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={classes.button}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ArticleForm;
import React from "react"

const NothingFound = ({title}) => (
  <section className="nothing-card">
    <header className="card-header">
      <i className="icon book_icon" />&nbsp;没有找到想拍的类型？
    </header>
    <div className="card-body">
      <img src="" className="fl"/>
      <p className="fr">
        长按左侧二维码添加YAOPAI小秘书<br/>
        <span>为您订制个性拍摄服务</span>
      </p>
    </div>
    <footer className="card-footer">
      <span>你也可以选择</span>
      <div className="btn-block btn-small">
        <a className="btn btn-black" href="tel:0371-65337727">
          免费电话咨询
        </a>
      </div>
    </footer>
  </section>
)

export default NothingFound

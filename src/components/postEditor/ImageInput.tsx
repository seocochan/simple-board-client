import * as React from 'react';

import styles from './ImageInput.module.less';

interface Props {
  setFile: (file: Blob) => void;
  imageUrl?: string;
}

interface State {
  imageUrl: string | null;
}

class ImageInput extends React.Component<Props, State> {
  public readonly state: State = {
    imageUrl: null
  };

  public componentDidMount() {
    const { imageUrl } = this.props;
    if (imageUrl) {
      this.setState({ imageUrl });
    }
  }

  private handleChange = (e: any) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({ imageUrl: reader.result as string });
      this.props.setFile(file);
    };
    reader.readAsDataURL(file);
  };

  public render() {
    const { imageUrl } = this.state;
    return (
      <>
        <input
          className={styles.input}
          onChange={this.handleChange}
          id="image-upload"
          type="file"
          accept="image/*"
        />
        <div className={styles.imageFrame}>
          <img
            className={styles.image}
            width={imageUrl ? '90%' : 0}
            src={imageUrl || undefined}
          />
        </div>
      </>
    );
  }
}

export default ImageInput;
